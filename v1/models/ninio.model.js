import mongoose from "mongoose";

const { Schema } = mongoose;

const ninioSchema = new Schema({
  nombre: String,
  recorrida: String, // valores: rojo, azul, naranja, amarillo
  division: String,
  contacto_padres: String,
  direccion: String,
  restriccion_alimenticia: String,
  fecha_cumple: Date,
});

export default mongoose.model("Niño", ninioSchema);
