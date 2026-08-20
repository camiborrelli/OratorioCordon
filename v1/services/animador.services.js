import Animador from "../models/animador.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Recorrida from "../models/recorrida.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const getAnimadoresService = async () => {
  return await Animador.find();
};

export const contarAnimadoresService = async () => {
  return await Animador.countDocuments();
};

export const registerService = async ({
  nombre,
  apellido,
  apodo,
  email,
  password,
  fechaCumple,
  division,
  recorrida,
  roles,
}) => {
  const usuarioExistente = await Animador.findOne({ email });
  if (usuarioExistente) {
    const error = new Error("Usuario o email ya existe");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const nuevoUsuario = new Animador({
    nombre,
    email,
    apellido,
    apodo,
    division,
    recorrida,
    fechaCumple,
    password: hashedPassword,
    roles: roles && roles.length ? roles : ["animador"],
  });

  await nuevoUsuario.save();

  const token = jwt.sign(
    { id: nuevoUsuario._id, email: nuevoUsuario.email },
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  const userObj = nuevoUsuario.toObject();
  delete userObj.password;
  return { user: userObj, token };
};

export const loginAnimadorService = async (payload = {}) => {
  const { email, password } = payload;

  if (!email || !password) {
    const err = new Error("Email y password son requeridos");
    err.status = 400;
    throw err;
  }

  const animador = await Animador.findOne({ email });

  if (!animador || !animador.password) {
    const err = new Error("Credenciales inválidas");
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, animador.password);
  if (!match) {
    const err = new Error("Credenciales inválidas");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: animador._id, email: animador.email },
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return {
    user: {
      id: animador._id,
      email: animador.email,
      division: animador.division,
      apodo: animador.apodo,
      rol: animador.roles,
    },
    token,
  };
};

export const getAnimadorByIdService = async (id) => {
  // Validate id before querying to avoid Mongoose Cast errors
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID inválido");
    err.status = 400;
    throw err;
  }

  const animador = await Animador.findById(id);
  if (!animador) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  return animador;
};

export const getAnimadorPorEmail = async (email) => {
  const animador = await Animador.findOne({ email });
  return animador;
};

export const updateAnimadorService = async (id, data) => {
  const allowed = [
    "nombre",
    "apellido",
    "apodo",
    "email",
    "edad",
    "division",
    "recorrida",
    "roles",
    "password",
  ];

  // Normalize recorrida: accept array or string from client, but store as string
  const normalized = { ...data };
  if (Array.isArray(normalized.recorrida)) {
    normalized.recorrida =
      normalized.recorrida.length > 0 ? normalized.recorrida[0] : undefined;
  }

  if (normalized.password) {
    normalized.password = await bcrypt.hash(normalized.password, 12);
  }

  const patch = {};
  for (const key of allowed) {
    if (key in normalized) patch[key] = normalized[key];
  }

  const animadorActualizado = await Animador.findByIdAndUpdate(id, patch, {
    new: true,
  });
  if (!animadorActualizado) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  return animadorActualizado;
};

export const eliminarAnimadorService = async (id) => {
  const animadorEliminado = await Animador.findByIdAndDelete(id);
  if (!animadorEliminado) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  return animadorEliminado;
};

export default {
  getAnimadoresService,
  registerService,
  loginAnimadorService,
  getAnimadorByIdService,
  updateAnimadorService,
  contarAnimadoresService,
  eliminarAnimadorService,
};

export const quitarRolService = async (id) => {
  const animador = await Animador.findById(id);
  if (!animadorEliminado) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  animador.roles = ["animador"];
  animador.save();
  return animador;
};
