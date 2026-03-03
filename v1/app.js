const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Example auth middleware applied to protected routes
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

app.use("/ninio", auth, require("../routes/ninio.routes"));
app.use("/animador", auth, require("../routes/animador.routes"));
app.use("/division", auth, require("../routes/division.routes"));
app.use("/evento", auth, require("../routes/evento.routes"));

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (must be after routes)
app.use(errorHandler);

module.exports = app;
