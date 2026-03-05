import mongoose from "mongoose";

const { Schema } = mongoose;

export const AnimadorSchema = new Schema({
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
    enum: ["animador", "coordinador_general", "coordinador_A", "coordinador_B"],
    default: ["animador"],
  },
});

export default mongoose.model("Animador", AnimadorSchema);
