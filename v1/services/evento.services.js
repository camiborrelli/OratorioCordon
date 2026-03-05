import Evento from "../models/evento.model.js";

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
  const nuevoEvento = new Evento({ nombre, fecha, descripcion, lugar });

  const eventoGuardado = await nuevoEvento.save();
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

  const eventoActualizado = await Evento.findByIdAndUpdate(
    id,
    { nombre, fecha, descripcion, lugar },
    { new: true },
  );
  if (!eventoActualizado) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json(eventoActualizado);
};

export const deleteEventoService = async (req, res) => {
  const { id } = req.params;
  const eventoEliminado = await Evento.findByIdAndDelete(id);
  if (!eventoEliminado) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json({ message: "Evento eliminado correctamente" });
};
