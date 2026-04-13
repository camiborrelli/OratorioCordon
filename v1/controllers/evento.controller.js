import {
  getEventosService,
  createEventoService,
  updateEventoService,
  deleteEventoService,
  addAnimadorToEventoService,
  removeAnimadorFromEventoService,
  getAnimadoresDeEventoService,
} from "../services/evento.services.js";
import Evento from "../models/evento.model.js";

export const crearEventoController = async (req, res) => {
  try {
    await createEventoService(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerEventosController = async (req, res) => {
  try {
    await getEventosService(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerEventoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findById(id).populate("animadores");
    if (!evento)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarEventoController = async (req, res) => {
  try {
    await updateEventoService(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const agregarAnimadorAEventoController = async (req, res) => {
  try {
    const { id, animadorId } = req.params;
    const eventoActualizado = await addAnimadorToEventoService(id, animadorId);
    res.json(eventoActualizado);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getAnimadoresDeEventoController = async (req, res) => {
  try {
    const { id } = req.params;
    const animadores = await getAnimadoresDeEventoService(id);
    res.json(animadores);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const contarEventosController = async (req, res) => {
  try {
    const count = await Evento.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeAnimadorFromEventoController = async (req, res) => {
  try {
    const { id, animadorId } = req.params;
    const eventoActualizado = await removeAnimadorFromEventoService(
      id,
      animadorId,
    );
    res.json(eventoActualizado);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const eliminarEventoController = async (req, res) => {
  try {
    await deleteEventoService(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
