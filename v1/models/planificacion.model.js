import mongoose from "mongoose";

const { Schema } = mongoose;

const planificacionSchema = new Schema({
  Tema: String,
  fecha: Date,
  merienda: String,
  bendicionMerienda: {
    type: String,
    enum: ["chiquitos", "medianitos", "medianos", "grandes"],
    required: true,
  },
  oracionAnimadores: {
    type: String,
    enum: ["chiquitos", "medianitos", "medianos", "grandes"],
    required: true,
  },
  buenasTardes: {
    type: String,
    enum: ["chiquitos", "medianitos", "medianos", "grandes"],
    required: true,
  },
});

export default mongoose.model("Planificacion", planificacionSchema);
