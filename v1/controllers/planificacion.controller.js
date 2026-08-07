import { registrarPlanificacionServices } from "../services/planificacion.services.js";
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
