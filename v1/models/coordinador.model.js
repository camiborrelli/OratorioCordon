const mongoose = require("mongoose");

const coordinadorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Coordinador", coordinadorSchema);
