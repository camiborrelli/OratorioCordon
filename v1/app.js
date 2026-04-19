const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Example auth middleware applied to protected routes
const authModule = require("./middlewares/auth");
const errorHandlerModule = require("./middlewares/errorHandler");
const auth = authModule && authModule.default ? authModule.default : authModule;
const errorHandler =
  errorHandlerModule && errorHandlerModule.default
    ? errorHandlerModule.default
    : errorHandlerModule;

// routes are ESM modules exporting default router when imported via require
app.use("/ninio", require("../routes/ninio.routes").default);
app.use("/animador", require("../routes/animador.routes").default);
app.use("/division", require("../routes/division.routes").default);
app.use("/evento", require("../routes/evento.routes").default);
app.use("/recorrida", require("../routes/recorrida.routes").default);
app.use("/asistencia", require("../routes/asistencia.routes").default);
app.use("/reunion", require("../routes/reunion.routes").default);

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (must be after routes)
app.use(errorHandler);

module.exports = app;
