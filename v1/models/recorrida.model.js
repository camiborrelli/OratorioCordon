import mongoose from "mongoose";

const { Schema } = mongoose;

const recorridaSchema = new Schema({
  nombre: String,
  color: String, // valores: rojo, azul, naranja, amarillo
  ninios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Niño" }],
  animadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animador" }],
});

export default mongoose.model("Recorrida", recorridaSchema);
