import Reunion from "../models/reunion.model.js";

export const registrarReunionService = async (data) => {
  const { fecha, titulo, descripcion } = data;
  const fechaParsed = parseFechaLocal(fecha);
  const nuevaReunion = new Reunion({ fecha: fechaParsed, titulo, descripcion });
  const reunionGuardada = await nuevaReunion.save();
  return reunionGuardada;
};

export const obtenerReunionesService = async () => {
  const reuniones = await Reunion.find().sort({ fecha: -1 });
  return reuniones;
};

export const actualizarResumenReunionService = async (id, data) => {
  const { fecha, titulo, descripcion } = data;
  const fechaParsed = parseFechaLocal(fecha);
  const reunionActualizada = await Reunion.findByIdAndUpdate(
    id,
    { fecha: fechaParsed, titulo, descripcion },
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

function parseFechaLocal(fechaInput) {
  if (!fechaInput) return undefined;
  if (fechaInput instanceof Date) return fechaInput;
  if (typeof fechaInput === "number") return new Date(fechaInput);
  if (typeof fechaInput !== "string") return undefined;

  // If format is YYYY-MM-DDTHH:mm (common from <input type="datetime-local">), parse as local
  const localDateTimeMatch = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaInput);
  if (localDateTimeMatch) {
    const [datePart, timePart] = fechaInput.split("T");
    const [y, m, d] = datePart.split("-").map((v) => parseInt(v, 10));
    const [hh, mm] = timePart.split(":").map((v) => parseInt(v, 10));
    return new Date(y, m - 1, d, hh, mm, 0, 0);
  }

  // If format is YYYY-MM-DD, treat as local date at midnight
  const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.test(fechaInput);
  if (dateOnlyMatch) {
    const [y, m, d] = fechaInput.split("-").map((v) => parseInt(v, 10));
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  // Otherwise let Date parse (handles ISO with Z or offsets)
  const parsed = new Date(fechaInput);
  if (!isNaN(parsed.getTime())) return parsed;
  return undefined;
}
