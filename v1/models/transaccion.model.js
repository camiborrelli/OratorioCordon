import { Schema } from "mongoose";

const transaccionSchema = new Schema({
  tipo: { type: String, enum: ["ingreso", "egreso"], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  descripcion: { type: String },
  metodo: { type: String, enum: ["efectivo", "tarjeta", "transferencia"] },
  motivo: { type: String }, //donacion, pagar, etc
});

export default transaccionSchema;
