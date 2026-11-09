import mongoose from "mongoose";

const { Schema } = mongoose;

export const AnimadorSchema = new Schema({
  nombre: String,
  apellido: String,
  apodo: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  password: String,
  division: {
    type: String,
    enum: ["chiquitos", "medianitos", "medianos", "grandes"],
    required: true,
  },
  recorrida: {
    type: String,
    enum: ["roja", "azul", "naranja", "amarilla"],
    required: true,
  },
  fechaCumple: Date,
  roles: {
    type: [String],
    enum: ["animador", "coordinador", "economo", "admin"],
    default: ["animador"],
  },
});

export default mongoose.model("Animador", AnimadorSchema);
