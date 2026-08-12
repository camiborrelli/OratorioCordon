import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Configure CORS to allow requests from the frontend domain(s).
// Set ALLOWED_ORIGINS env to a comma-separated list of allowed origins
// e.g. ALLOWED_ORIGINS=https://oratorio-cordon-9w93neg8h-camilas-projects-2b00654e.vercel.app
const rawAllowed = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = rawAllowed
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like curl, server-to-server
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// Servir archivos estáticos (frontend simple)
app.use(express.static("public"));

// Normalize incoming paths:
// 1) If request URL contains an accidental duplicated hostname (happens when
//    frontend baseURL was malformed and produced a path like
//    /<host>/<host>/animador/login) — try to recover the real API path by
//    keeping the substring after the last occurrence of '.vercel.app'.
// 2) If requests come prefixed with '/v1', strip it so existing mount points
//    (which are registered at '/animador', '/evento', etc.) still match.
app.use((req, res, next) => {
  try {
    // fix duplicated vercel host in path
    const url = req.url || "";
    const marker = ".vercel.app";
    if (url.indexOf(marker) !== -1) {
      const last = url.lastIndexOf(marker);
      // keep everything after the last marker
      const after = url.substring(last + marker.length);
      if (after && after.startsWith("/")) {
        req.url = after;
      }
    }

    // strip leading /v1 if present so routes mounted without /v1 still work
    if (req.url.startsWith("/v1/")) {
      req.url = req.url.replace(/^\/v1/, "");
    } else if (req.url === "/v1") {
      req.url = "/";
    }
  } catch (e) {}
  return next();
});

app.use((req, res, next) => {
  try {
    const path = req.originalUrl || req.url;
    if (path && path.includes("/animador/login")) {
      console.log(
        "[DEBUG] server.js request =>",
        req.method,
        path,
        "headers:",
        JSON.stringify(req.headers || {}),
      );
    }
  } catch (e) {}
  return next();
});

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
import {
  registrarRecordatorioController,
  obtenerRecordatoriosController,
} from "./v1/controllers/recordatorio.controller.js";
import {
  registrarPlanificacionController,
  obtenerPlanificacionController,
} from "./v1/controllers/planificacion.controller.js";

app.get("/recordatorios", obtenerRecordatoriosController);
app.post("/recordatorio", registrarRecordatorioController);
app.post("/recordatorios", registrarRecordatorioController);
app.get("/planificaciones", obtenerPlanificacionController);
app.get("/planificacion", obtenerPlanificacionController);
app.post("/planificacion", registrarPlanificacionController);
app.post("/planificaciones", registrarPlanificacionController);

app.use("/ninio", ninioRoutes);
app.use("/ninios", ninioRoutes);
app.use("/animador", animadorRoutes);
// Alias histórico: aceptar llamadas a `/animadores` desde el frontend antiguo
app.use("/animadores", animadorRoutes);
app.use("/division", divisionRoutes);
app.use("/evento", eventoRoutes);
app.use("/eventos", eventoRoutes);
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
