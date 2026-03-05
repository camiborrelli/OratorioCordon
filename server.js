require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// Servir archivos estáticos (frontend simple)
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/oratoriocordon";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// routes are authored as ESM modules with `export default router`, when required
// from CommonJS the module object contains the router on `.default`.
const loadRouter = (p) => {
  try {
    const mod = require(p);
    const router = mod && mod.default ? mod.default : mod;
    if (typeof router !== "function" && !(router && router.stack)) {
      throw new Error(
        `${p} did not export an express router (got ${typeof router})`,
      );
    }
    return router;
  } catch (err) {
    console.error(
      `Error loading router ${p}:`,
      err && err.message ? err.message : err,
    );
    throw err;
  }
};

app.use("/ninio", loadRouter("./v1/routes/ninio.routes"));
app.use("/animador", loadRouter("./v1/routes/animador.routes"));
app.use("/division", loadRouter("./v1/routes/division.routes"));
app.use("/evento", loadRouter("./v1/routes/evento.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
