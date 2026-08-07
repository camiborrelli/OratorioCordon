import mongoose from "mongoose";

const { Schema } = mongoose;

const recordatorioSchema = new Schema({
  titulo: String,
  descripcion: String,
});

export default mongoose.model("Recordatorio", recordatorioSchema);
