import Reunion from "../models/reunion.model.js";

export const registrarReunionService = async (data) => {
  const { fecha, titulo, descripcion } = data;
  const nuevaReunion = new Reunion({ fecha, titulo, descripcion });
  const reunionGuardada = await nuevaReunion.save();
  return reunionGuardada;
};

export const obtenerReunionesService = async () => {
  const reuniones = await Reunion.find().sort({ fecha: 1 });
  return reuniones;
};

export const actualizarResumenReunionService = async (id, data) => {
  const { fecha, titulo, descripcion } = data;
  const reunionActualizada = await Reunion.findByIdAndUpdate(
    id,
    { fecha, titulo, descripcion },
    { new: true },
  );
  if (!reunionActualizada) {
    const err = new Error("Reunión no encontrada");
    err.status = 404;
    throw err;
  }
  return reunionActualizada;
};

export const eliminarResumenReunionService = async (id) => {
  const reunionEliminada = await Reunion.findByIdAndDelete(id);
  if (!reunionEliminada) {
    const err = new Error("Reunión no encontrada");
    err.status = 404;
    throw err;
  }
  return {
    message: "Reunión eliminada correctamente",
    deleted: reunionEliminada,
  };
};
