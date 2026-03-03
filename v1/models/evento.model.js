const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
  nombre: String,
  fecha: Date,
  descripcion: String,
  lugar: String,
});

module.exports = mongoose.model("Evento", eventoSchema);
