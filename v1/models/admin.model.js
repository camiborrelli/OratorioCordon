import mongoose from "mongoose";

const { Schema } = mongoose;

export const AdminSchema = new Schema({
  nombre: String,
  apellido: String,
  apodo: String,
  email: String,
  fechaCumple: Date,
  telefono: String,
  restricciones: String,
  password: String,
  division: {
    type: String,
    enum: ["chiquitos", "medianitos", "medianos", "grandes"],
    required: true,
  },
  recorrida: {
    type: String,
    enum: ["rojo", "azul", "naranja", "amarillo"],
    required: true,
  },
});

export default mongoose.model("Admin", AdminSchema);
