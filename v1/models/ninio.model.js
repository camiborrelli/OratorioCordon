import mongoose from "mongoose";

const { Schema } = mongoose;

const contactoSchema = new Schema(
  {
    nombre: { type: String },
    telefono: { type: String },
    parentesco: { type: String },
  },
  { _id: false },
);

const ninioSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  edad: { type: Number },
  recorrida: { type: String },
  division: { type: String },
  contactos: { type: [contactoSchema], default: [] },
  direccion: { type: String },
  observaciones: { type: String },
  fecha_nacimiento: { type: Date },
  foto: { type: String },
  asistencia: [{ type: Schema.Types.ObjectId, ref: "Asistencia" }],
});

export default mongoose.model("Ninio", ninioSchema);
