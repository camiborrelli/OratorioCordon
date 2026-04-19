import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// CORS: allow list can be set via env `ALLOWED_ORIGINS` (comma-separated)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "https://oratorio-cordon-app.vercel.app,http://localhost:5173").split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser (curl, server-side) requests when origin is undefined
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.use(express.json());
// Servir archivos estáticos (frontend simple)
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/oratoriocordon";

// Import routers (ES modules)
import ninioRoutes from "./v1/routes/ninio.routes.js";
import animadorRoutes from "./v1/routes/animador.routes.js";
import divisionRoutes from "./v1/routes/division.routes.js";
import eventoRoutes from "./v1/routes/evento.routes.js";
import recorridaRoutes from "./v1/routes/recorrida.routes.js";
import adminRoutes from "./v1/routes/admin.routes.js";
import reunionRoutes from "./v1/routes/reunion.routes.js";
import asistenciaRoutes from "./v1/routes/asistencia.routes.js";

app.use("/ninio", ninioRoutes);
app.use("/ninios", ninioRoutes);
app.use("/animador", animadorRoutes);
// Alias histórico: aceptar llamadas a `/animadores` desde el frontend antiguo
app.use("/animadores", animadorRoutes);
app.use("/division", divisionRoutes);
app.use("/evento", eventoRoutes);
app.use("/recorrida", recorridaRoutes);
app.use("/admin", adminRoutes);
app.use("/asistencia", asistenciaRoutes);
app.use("/reunion", reunionRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB (primary)");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(async (err) => {
    console.error(
      "Error conectando a MongoDB (primary):",
      err && err.message ? err.message : err,
    );
    // If configured, try a local fallback to help development when Atlas is unreachable
    const allowFallback = process.env.ALLOW_LOCAL_FALLBACK === "true";
    const localUri = "mongodb://127.0.0.1:27017/oratoriocordon";
    if (allowFallback) {
      console.log("Intentando conexión fallback a MongoDB local:", localUri);
      try {
        await mongoose.connect(localUri);
        console.log("Conectado a MongoDB (local fallback)");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
          console.log(`Servidor corriendo en puerto ${PORT}`),
        );
        return;
      } catch (fallbackErr) {
        console.error(
          "Error conectando a MongoDB local (fallback):",
          fallbackErr && fallbackErr.message
            ? fallbackErr.message
            : fallbackErr,
        );
      }
    }

    console.error(
      "No se pudo conectar a MongoDB. Sugerencias: 1) Verifique que la IP actual esté en la whitelist de Atlas; 2) Confirme que las credenciales y el URI (mongodb+srv://...) sean correctos; 3) Pruebe conexión desde su máquina con 'mongosh <URI>' o habilite local fallback con ALLOW_LOCAL_FALLBACK=true.",
    );
    process.exit(1);
  });
