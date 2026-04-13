import { Schema } from "mongoose";

const cuentaBancariaSchema = new Schema({
  banco: { type: String, required: true },
  numeroCuenta: { type: String, required: true },
  tipoCuenta: { type: String, enum: ["corriente", "ahorros"], required: true },
});
export default cuentaBancariaSchema;
