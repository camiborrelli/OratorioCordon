import Planificacion from "../models/planificacion.model.js";

export const registrarPlanificacionServices = async (req, res) => {
  try {
    const {
      Tema,
      fecha,
      merienda,
      bendicionMerienda,
      oracionAnimadores,
      buenasTardes,
    } = req.body;
    const nuevaPlanificacion = new Planificacion({
      Tema,
      fecha,
      merienda,
      bendicionMerienda,
      oracionAnimadores,
      buenasTardes,
    });
    await nuevaPlanificacion.save();
    res.status(201).json(nuevaPlanificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
