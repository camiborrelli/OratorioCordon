import {
  crearEventoController,
  obtenerEventosController,
  obtenerEventoPorIdController,
  actualizarEventoController,
  eliminarEventoController,
} from "../v1/services/evento.service.js";

export const crearEventoController = async (req, res) => {
  const eventoCreado = await crearEventoController(req, res);
  res.status(201).json(eventoCreado);
};

export const obtenerEventosController = async (req, res) => {
  const eventos = await obtenerEventosController(req, res);
  res.json(eventos);
};

export const obtenerEventoPorIdController = async (req, res) => {
  const evento = await obtenerEventoPorIdController(req, res);
  res.json(evento);
};

export const actualizarEventoController = async (req, res) => {
  const eventoActualizado = await actualizarEventoController(req, res);
  res.json(eventoActualizado);
};

export const eliminarEventoController = async (req, res) => {
  const resultadoEliminacion = await eliminarEventoController(req, res);
  res.json(resultadoEliminacion);
};
