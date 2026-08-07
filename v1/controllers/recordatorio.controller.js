import { registrarRecordatorioService } from "../services/recordatorio.services.js";
import Recordatorio from "../models/recordatorio.model.js";

export const registrarRecordatorioController = async (req, res) => {
  try {
    await registrarRecordatorioService(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
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
