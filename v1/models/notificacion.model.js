import mongoose from "mongoose";

const { Schema } = mongoose;

const notificacionSchema = new Schema(
  {
    destinatario: {
      type: Schema.Types.ObjectId,
      ref: "Animador",
      required: true,
      index: true,
    },
    tipo: {
      type: String,
      enum: ["rol", "evento", "planificacion", "recordatorio"],
      required: true,
    },
    titulo: { type: String, required: true },
    mensaje: { type: String, required: true },
    leida: { type: Boolean, default: false },
  },
  { timestamps: true },
);

notificacionSchema.index({ destinatario: 1, leida: 1, createdAt: -1 });

export default mongoose.model("Notificacion", notificacionSchema);
