import Reunion from "../models/reunion.model.js";

import {
  registrarReunionService,
  obtenerReunionesService,
  actualizarResumenReunionService,
  eliminarResumenReunionService,
} from "../services/reunion.services.js";

export const agregarResumenReunionController = async (req, res) => {
  const { fecha, titulo, descripcion } = req.body;
  try {
    const nuevaReunion = await registrarReunionService({
      fecha,
      titulo,
      descripcion,
    });
    const reunionGuardada = await nuevaReunion.save();
    res.status(201).json(reunionGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerReunionesController = async (req, res) => {
  try {
    const reuniones = await obtenerReunionesService();
    res.json(reuniones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarResuemenReunionController = async (req, res) => {
  const { id } = req.params;
  const { fecha, titulo, descripcion } = req.body;
  try {
    const reunionActualizada = await actualizarResumenReunionService(id, {
      fecha,
      titulo,
      descripcion,
    });
    if (!reunionActualizada) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }
    res.json(reunionActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarResumenReunionController = async (req, res) => {
  const { id } = req.params;
  try {
    const reunionEliminada = await eliminarResumenReunionService(id);
    if (!reunionEliminada) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }
    res.json({
      message: "Reunión eliminada correctamente",
      deleted: reunionEliminada,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
