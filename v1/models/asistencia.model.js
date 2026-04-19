import { Schema } from "mongoose";

const AsistenciaSchema = new Schema(
  {
    ninio: { type: Schema.Types.ObjectId, ref: "Ninio", required: true },
    fecha: { type: Date, required: true }, // stored as date (day) at local midnight
    status: {
      type: String,
      enum: ["present", "absent", "unmarked"],
      default: "unmarked",
    },
    hora: Date, // optional exact timestamp when marked
  },
  { timestamps: true },
);

export default AsistenciaSchema;

AsistenciaSchema.index({ ninio: 1, fecha: 1 }, { unique: true });
