import mongoose from "mongoose";

const { Schema } = mongoose;

const divisionSchema = new Schema({
  nombre: String,
  edad_minima: Number,
  edad_maxima: Number,
  listadeninios: [{ type: Schema.Types.ObjectId, ref: "Niño" }],
  animadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animador" }],
});

export default mongoose.model("Division", divisionSchema);
