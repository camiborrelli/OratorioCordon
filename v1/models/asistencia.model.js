import { Schema } from "mongoose";

const asistenciaSchema = new Schema({
  ninio: { type: Schema.Types.ObjectId, ref: "Ninio" },
  fecha: { type: Date, required: true },
  presente: { type: Boolean },
});

export default mongoose.model("Asistencia", asistenciaSchema);
