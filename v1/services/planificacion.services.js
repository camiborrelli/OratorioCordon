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

export const eliminarPlanificacionServices = async (id) => {
  try {
    const planificacion = await Planificacion.findByIdAndDelete(id);
    if (!planificacion) {
      return null;
    }
    res.status(200).json({ message: "Planificación eliminada correctamente" });
  } catch (error) {
    throw error;
  }
};
