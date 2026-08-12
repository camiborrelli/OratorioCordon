import {
  registrarRecordatorioService,
  editarRecordatorioService,
} from "../services/recordatorio.services.js";
import Recordatorio from "../models/recordatorio.model.js";

export const registrarRecordatorioController = async (req, res) => {
  try {
    await registrarRecordatorioService(req, res);
  } catch (error) {
    if (!res.headersSent) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
};

export const obtenerRecordatoriosController = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.find();
    res.json(recordatorios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarRecordatorioController = async (req, res) => {
  try {
    await editarRecordatorioService(req, res);
  } catch (error) {
    if (!res.headersSent) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
};

export const marcarComoCompletadoController = async (req, res) => {
  try {
    const { id } = req.params;
    const recordatorio = await Recordatorio.findById(id);
    if (!recordatorio) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }
    recordatorio.estado = "completado";
    await recordatorio.save();
    res.json(recordatorio);
  } catch (error) {
    if (!res.headersSent) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
};
