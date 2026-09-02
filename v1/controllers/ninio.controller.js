import {
  registrarNinioService,
  getNiniosService,
  getNinioByNameService,
  actualizarNinioService,
  eliminarNinioService,
  countNiniosService,
  getNiniosCumplenMesService,
  getNiniosEliminadosService,
} from "../services/ninio.services.js";
import Ninio from "../models/ninio.model.js";
import Recorrida from "../models/recorrida.model.js";
import Division from "../models/division.model.js";
import mongoose from "mongoose";

export const registrarNinioController = async (req, res) => {
  try {
    const ninioCreado = await registrarNinioService(req.body);
    res.status(201).json(ninioCreado);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerNiniosController = async (req, res) => {
  try {
    const ninios = await getNiniosService();
    res.json(ninios);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerNinioPorNombreController = async (req, res) => {
  try {
    const ninio = await getNinioByNameService(req.params.nombre);
    res.json(ninio);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const obtenerNinioPorDivisionController = async (req, res) => {
  const { division } = req.params;

  const ninios = await Ninio.find({ division }).populate("recorrida");
  if (ninios.length === 0) {
    return res
      .status(404)
      .json({ message: "No se encontraron niños en esa división" });
  }
  res.json(ninios);
};

export const obtenerNinioPorIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const ninio = await Ninio.findById(id).populate("division recorrida");
    if (!ninio) return res.status(404).json({ message: "Niño no encontrado" });

    // If recorrida or division were stored as plain strings (legacy data), try to resolve them
    // to the corresponding documents so the frontend edit form can preselect values.
    if (!ninio.recorrida || typeof ninio.recorrida === "string") {
      const value = ninio.recorrida;
      let resolved = null;
      if (value && mongoose.Types.ObjectId.isValid(String(value))) {
        resolved = await Recorrida.findById(String(value));
      }
      if (!resolved && value) {
        resolved = await Recorrida.findOne({
          nombre: { $regex: `^${String(value)}$`, $options: "i" },
        });
      }
      if (resolved) ninio.recorrida = resolved;
    }

    if (!ninio.division || typeof ninio.division === "string") {
      const value = ninio.division;
      let resolved = null;
      if (value && mongoose.Types.ObjectId.isValid(String(value))) {
        resolved = await Division.findById(String(value));
      }
      if (!resolved && value) {
        resolved = await Division.findOne({
          nombre: { $regex: `^${String(value)}$`, $options: "i" },
        });
      }
      if (resolved) ninio.division = resolved;
    }

    return res.json(ninio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerNinioPorRecorridaController = async (req, res) => {
  const { recorrida } = req.params;
  const ninios = await Ninio.find({ recorrida }).populate("division");
  if (ninios.length === 0) {
    return res
      .status(404)
      .json({ message: "No se encontraron niños en esa recorrida" });
  }
  res.json(ninios);
};

export const actualizarNinioController = async (req, res) => {
  try {
    const ninioActualizado = await actualizarNinioService(
      req.params.id,
      req.body,
    );
    res.json(ninioActualizado);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const eliminarNinioController = async (req, res) => {
  try {
    await eliminarNinioService(req.params.id);
    res.json({ message: "Niño eliminado correctamente" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const contarNiniosController = async (req, res) => {
  try {
    const count = await countNiniosService();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNiniosPorFechaCumpleaController = async (req, res) => {
  const { fecha } = req.params;
  try {
    const ninios = await Ninio.find({
      fecha_nacimiento: {
        $gte: new Date(`${fecha}-01-01`),
        $lte: new Date(`${fecha}-12-31`),
      },
    });
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNiniosCumplenMesController = async (req, res) => {
  const { mes } = req.query;
  try {
    const ninios = await getNiniosCumplenMesService(mes);
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cambiarDivisionNinioController = async (req, res) => {
  const { id } = req.params;
  const { nuevaDivision } = req.body;
  const ninio = await Ninio.findById(id);
  if (!ninio) return res.status(404).json({ message: "Niño no encontrado" });

  try {
    const division = await Division.findOne({
      nombre: { $regex: new RegExp(`^${nuevaDivision}$`, "i") },
    });
    if (!division) {
      return res.status(404).json({ message: "División no encontrada" });
    }
    ninio.division = division.nombre;
    await ninio.save();
    res.json({ message: "División actualizada exitosamente", ninio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNiniosEliminadosController = async (req, res) => {
  try {
    const niniosEliminados = await getNiniosEliminadosService();
    res.json(niniosEliminados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
