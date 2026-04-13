import Recorrida from "../models/recorrida.model.js";
import {
  getRecorridasService,
  crearRecorridaService,
  obtenerRecorridaPorIdService,
  actualizarRecorridaService,
  eliminarRecorridaService,
} from "../services/recorrida.services.js";

export const obtenerRecorridasController = async (req, res) => {
  try {
    const recorridas = await getRecorridasService();
    res.json(recorridas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearRecorridaController = async (req, res) => {
  const nuevaRecorrida = await crearRecorridaService(req, res);
  res.status(201).json(nuevaRecorrida);
};

export const obtenerRecorridaPorIdController = async (req, res) => {
  const recorrida = await obtenerRecorridaPorIdService(req, res);
  res.json(recorrida);
};

export const actualizarRecorridaController = async (req, res) => {
  const recorridaActualizada = await actualizarRecorridaService(req, res);
  res.json(recorridaActualizada);
};

export const eliminarRecorridaController = async (req, res) => {
  const resultado = await eliminarRecorridaService(req, res);
  res.json(resultado);
};

export const contarRecorridasController = async (req, res) => {
  const count = await Recorrida.countDocuments();
  res.json({ count });
};
