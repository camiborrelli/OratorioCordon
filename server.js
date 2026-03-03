const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/oratoriocordon";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.use("/ninio", require("./v1/routes/ninio.routes"));
app.use("/animador", require("./v1/routes/animador.routes"));
app.use("/division", require("./v1/routes/division.routes"));
app.use("/evento", require("./v1/routes/evento.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
