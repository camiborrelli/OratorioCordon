import mongoose from "mongoose";

const { Schema } = mongoose;

const recordatorioSchema = new Schema({
  titulo: String,
  descripcion: String,
  estado: {
    type: String,
    enum: ["pendiente", "completado"],
    default: "pendiente",
  },
});

export default mongoose.model("Recordatorio", recordatorioSchema);
