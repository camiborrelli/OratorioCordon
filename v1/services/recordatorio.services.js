import Recordatorio from "../models/recordatorio.model.js";
import { notificarATodos } from "./notificacion.services.js";

export const registrarRecordatorioService = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({
        message: "Título y descripción son obligatorios",
      });
    }

    const nuevoRecordatorio = new Recordatorio({ titulo, descripcion });
    const recordatorioGuardado = await nuevoRecordatorio.save();
    await notificarATodos({
      tipo: "recordatorio",
      titulo: "Nuevo recordatorio",
      mensaje: `${recordatorioGuardado.titulo}: ${recordatorioGuardado.descripcion}`,
    });
    return res.status(201).json(recordatorioGuardado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editarRecordatorioService = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const recordatorio = await Recordatorio.findById(id);

    if (!recordatorio) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    const recordatorioActualizado = await Recordatorio.findByIdAndUpdate(
      id,
      { titulo, descripcion },
      { new: true },
    );
    return res.status(200).json(recordatorioActualizado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarRecordatorioService = async (id) => {
  try {
    const recordatorio = await Recordatorio.findByIdAndDelete(id);
    return recordatorio;
  } catch (error) {
    throw new Error(error.message);
  }
};
