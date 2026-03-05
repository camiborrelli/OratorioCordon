import mongoose from "mongoose";

const { Schema } = mongoose;

const coordinadorSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
});

export default mongoose.model("Coordinador", coordinadorSchema);
