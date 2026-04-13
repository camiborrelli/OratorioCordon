import mongoose from "mongoose";

const { Schema } = mongoose;

const eventoSchema = new Schema({
  nombre: String,
  fecha: Date,
  descripcion: String,
  lugar: String,
  animadores: [{ type: Schema.Types.ObjectId, ref: "Animador" }],
});

export default mongoose.model("Evento", eventoSchema);
