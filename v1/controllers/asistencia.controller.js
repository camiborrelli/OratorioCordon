import Ninio from "../models/ninio.model.js";
import Asistencia from "../models/asistencia.model.js";
import { contarTotalAsistenciasPorFechaService } from "../services/asistencia.services.js";

export const confirmarAsistenciaController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const { fecha, status } = req.body;

    const ninio = await Ninio.findById(ninioId);
    if (!ninio) return res.status(404).json({ message: "Niño no encontrado" });
    const nuevaAsistencia = new Asistencia({ ninio: ninioId, fecha, status });
    const asistenciaGuardada = await nuevaAsistencia.save();
    if (status === "absent") {
      await Ninio.findByIdAndUpdate(ninioId, { $inc: { cantFaltas: 1 } });
    }
    res.status(201).json(asistenciaGuardada);
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: "La asistencia ya fue registrada para ese día" });
    res.status(500).json({ message: error.message });
  }
};

export const obtenerAsistenciaPorNinioController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const asistencias = await Asistencia.find({ ninio: ninioId });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerAsistenciaPorFechaController = async (req, res) => {
  try {
    const { fecha } = req.params;
    const asistencias = await contarTotalAsistenciasPorFechaService(fecha);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerCantFaltasPorNinioController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const ninio = await Ninio.findById(ninioId);
    if (!ninio) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    return res.json({ cantFaltas: ninio.cantFaltas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
