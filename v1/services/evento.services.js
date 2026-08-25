import Evento from "../models/evento.model.js";
import Animador from "../models/animador.model.js";
import { notificarATodos } from "./notificacion.services.js";

export const getEventosService = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEventoService = async (req, res) => {
  const { nombre, fecha, descripcion, lugar } = req.body;
  const fechaParsed = parseFechaLocal(fecha);
  const nuevoEvento = new Evento({ nombre, fecha: fechaParsed, descripcion, lugar });

  const eventoGuardado = await nuevoEvento.save();
  await notificarATodos({
    tipo: "evento",
    titulo: "Nuevo evento",
    mensaje: `Se agregó el evento \"${eventoGuardado.nombre}\"${eventoGuardado.lugar ? ` en ${eventoGuardado.lugar}` : ""}.`,
  });
  res.status(201).json(eventoGuardado);
};

export const getEventoByNameService = async (req, res) => {
  const { nombre } = req.params;
  const evento = await Evento.findOne({ nombre });
  if (!evento) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json(evento);
};

export const updateEventoService = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, descripcion, lugar } = req.body;
  const update = { nombre, descripcion, lugar };
  if (fecha !== undefined) update.fecha = parseFechaLocal(fecha);

  const eventoActualizado = await Evento.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!eventoActualizado) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json(eventoActualizado);
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

export const deleteEventoService = async (req, res) => {
  const { id } = req.params;
  const eventoEliminado = await Evento.findByIdAndDelete(id);
  if (!eventoEliminado) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json({ message: "Evento eliminado correctamente" });
};

export const addAnimadorToEventoService = async (eventoId, animadorId) => {
  const evento = await Evento.findById(eventoId);
  if (!evento) {
    const err = new Error("Evento no encontrado");
    err.status = 404;
    throw err;
  }
  if (
    evento.animadores &&
    evento.animadores.some((a) => a.toString() === animadorId)
  ) {
    const err = new Error("Animador ya agregado al evento");
    err.status = 400;
    throw err;
  }
  const animador = await Animador.findById(animadorId);
  if (!animador) {
    const err = new Error("Animador no encontrado");
    err.status = 404;
    throw err;
  }
  // store reference id
  evento.animadores.push(animadorId);
  await evento.save();
  return evento;
};

export const removeAnimadorFromEventoService = async (eventoId, animadorId) => {
  const evento = await Evento.findById(eventoId);
  if (!evento) {
    throw new Error("Evento no encontrado");
  }
  evento.animadores = evento.animadores.filter(
    (id) => id.toString() !== animadorId,
  );
  await evento.save();
  return evento;
};

export const getAnimadoresDeEventoService = async (eventoId) => {
  const evento = await Evento.findById(eventoId).populate("animadores");
  if (!evento) {
    throw new Error("Evento no encontrado");
  }
  return evento.animadores;
};
