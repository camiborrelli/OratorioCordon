import mongoose from "mongoose";

const { Schema } = mongoose;

const recorridaSchema = new Schema({
  nombre: String,
  ninios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ninio" }],
  animadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animador" }],
});

// Create a case-insensitive unique index on `nombre` so names like "Azul" and "azul" conflict
recorridaSchema.index(
  { nombre: 1 },
  { unique: true, collation: { locale: "es", strength: 2 } },
);

const Recorrida = mongoose.model("Recorrida", recorridaSchema);

export default Recorrida;
