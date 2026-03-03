const mongoose = require("mongoose");

const recorridaSchema = new mongoose.Schema({
  nombre: String,
  color: String, // valores: rojo, azul, naranja, amarillo
  ninios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Niño" }],
  animadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animador" }],
});

module.exports = mongoose.model("Recorrida", recorridaSchema);
