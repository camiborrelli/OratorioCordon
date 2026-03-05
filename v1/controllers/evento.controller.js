import {
  getEventosService,
  createEventoService,
  getEventoByNameService,
  updateEventoService,
  deleteEventoService,
} from "../services/evento.services.js";

export const crearEventoController = async (req, res) => {
  try {
    const eventoCreado = await createEventoService(req, res);
    res.status(201).json(eventoCreado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerEventosController = async (req, res) => {
  try {
    const eventos = await getEventosService(req, res);
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerEventoPorIdController = async (req, res) => {
  try {
    const evento = await getEventoByNameService(req, res);
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarEventoController = async (req, res) => {
  try {
    const eventoActualizado = await updateEventoService(req, res);
    res.json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarEventoController = async (req, res) => {
  try {
    const resultadoEliminacion = await deleteEventoService(req, res);
    res.json(resultadoEliminacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
