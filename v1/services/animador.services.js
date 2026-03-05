import Animador from "../models/animador.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const getAnimadoresService = async () => {
  return await Animador.find();
};

export const registerService = async ({ nombre, email, password, roles }) => {
  if (!nombre || !email || !password) {
    const err = new Error("Nombre, email y password son requeridos");
    err.status = 400;
    throw err;
  }

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

  return { user: nuevoUsuario.toObject(), token };
};

export const loginAnimadorService = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error("Email y password son requeridos");
    err.status = 400;
    throw err;
  }

  const animador = await Animador.findOne({ email });
  if (!animador || !(await bcrypt.compare(password, animador.password))) {
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

  return { user: animador.toObject(), token };
};

export const getAnimadorByIdService = async (id) => {
  const animador = await Animador.findById(id);
  if (!animador) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  return animador;
};

export const updateAnimadorService = async (id, data) => {
  const allowed = [
    "nombre",
    "apellido",
    "apodo",
    "email",
    "edad",
    "fechaCumple",
    "restricciones",
    "division",
    "recorrida",
    "roles",
  ];

  const patch = {};
  for (const key of allowed) {
    if (key in data) patch[key] = data[key];
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

export default {
  getAnimadoresService,
  registerService,
  loginAnimadorService,
  getAnimadorByIdService,
  updateAnimadorService,
};
