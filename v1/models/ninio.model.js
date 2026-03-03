const mongoose = require("mongoose");

const niñoSchema = new mongoose.Schema({
  nombre: String,
  recorrida: String, // valores: rojo, azul, naranja, amarillo
  division: String,
  contacto_padres: String,
  direccion: String,
  restriccion_alimenticia: String,
  fecha_cumple: Date,
});

module.exports = mongoose.model("Niño", niñoSchema);
