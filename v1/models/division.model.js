const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
  nombre: String,
  edad_minima: Number,
  edad_maxima: Number,
  listadeninios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Niño" }],
  animadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animador" }],
});

module.exports = mongoose.model("Division", divisionSchema);
