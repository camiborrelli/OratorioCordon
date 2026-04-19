import mongoose from "mongoose";

const { Schema } = mongoose;

const reunionSchema = new Schema({
  fecha: { type: Date, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
});

export default mongoose.model("Reunion", reunionSchema);
