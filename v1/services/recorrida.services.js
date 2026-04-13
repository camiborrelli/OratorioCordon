import Recorrida from "../models/recorrida.model.js";

export const getRecorridasService = async () => {
  return await Recorrida.find();
};

export const crearRecorridaService = async ({
  nombre,
  ninios = [],
  animadores = [],
}) => {
  const nuevaRecorrida = new Recorrida({ nombre, ninios, animadores });
  if (await yaExiste(nombre)) {
    const err = new Error("Ya existe una recorrida con ese nombre");
    err.status = 409;
    throw err;
  }
  try {
    const recorridaGuardada = await nuevaRecorrida.save();
    return recorridaGuardada;
  } catch (error) {
    if (error && error.code === 11000) {
      const err = new Error("Ya existe una recorrida con ese nombre");
      err.status = 409;
      throw err;
    }
    const err = new Error(error.message || "Error creando recorrida");
    err.status = 400;
    throw err;
  }
};

async function yaExiste(nombre) {
  if (!nombre) return false;
  const escaped = escapeRegex(nombre);
  const recorridaExistente = await Recorrida.findOne({
    nombre: { $regex: `^${escaped}$`, $options: "i" },
  });
  return !!recorridaExistente;
}

export const obtenerRecorridaPorIdService = async (id) => {
  const recorrida = await Recorrida.findById(id).populate("ninios animadores");
  if (!recorrida) {
    const err = new Error("Recorrida no encontrada");
    err.status = 404;
    throw err;
  }
  return recorrida;
};

export const actualizarRecorridaService = async (
  id,
  { nombre, ninios, animadores },
) => {
  const recorrida = await Recorrida.findById(id);
  if (!recorrida) {
    const err = new Error("Recorrida no encontrada");
    err.status = 404;
    throw err;
  }
  if (nombre && nombre !== recorrida.nombre) {
    if (await yaExiste(nombre)) {
      const err = new Error("Ya existe una recorrida con ese nombre");
      err.status = 409;
      throw err;
    } else {
      recorrida.nombre = nombre;
    }
  }
  const updated = await Recorrida.findByIdAndUpdate(
    id,
    { nombre, ninios, animadores },
    { new: true, runValidators: true },
  ).populate("ninios animadores");
  return updated;
};

export const eliminarRecorridaService = async (id) => {
  const recorridaEliminada = await Recorrida.findByIdAndDelete(id);
  if (!recorridaEliminada) {
    const err = new Error("Recorrida no encontrada");
    err.status = 404;
    throw err;
  }
  return { message: "Recorrida eliminada exitosamente" };
};

export const contarRecorridasService = async () => {
  const cant = await Recorrida.countDocuments();
  return { count: cant };
};
