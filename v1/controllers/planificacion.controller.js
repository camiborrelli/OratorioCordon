import {
  registrarPlanificacionServices,
  eliminarPlanificacionServices,
} from "../services/planificacion.services.js";
import Planificacion from "../models/planificacion.model.js";

export const registrarPlanificacionController = async (req, res) => {
  try {
    await registrarPlanificacionServices(req, res);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerPlanificacionController = async (req, res) => {
  try {
    const planificacion = await Planificacion.find();
    res.json(planificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarPlanificacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const planificacionEliminada = await eliminarPlanificacionServices(id);
    if (!planificacionEliminada) {
      return res.status(404).json({ message: "Planificación no encontrada" });
    }
    res.status(200).json({ message: "Planificación eliminada correctamente" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
