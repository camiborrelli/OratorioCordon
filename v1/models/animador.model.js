const mongoose = require("mongoose");

export const AnimadorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  apodo: String,
  email: String,
  edad: Number,
  fechaCumple: Date,
  restricciones: String,
  password: String,
  division: String,
  recorrida: String, // valores: rojo, azul, naranja, amarillo
  roles: {
    type: [String],
    enum: ["animador", "coordinador"],
    default: ["animador"],
  },
});

export default mongoose.model("Animador", AnimadorSchema);
