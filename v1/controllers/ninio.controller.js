import {
  registrarNinioService,
  getNiniosService,
  getNinioByNameService,
  actualizarNinioService,
  eliminarNinioService,
  subirFotoNinioService,
  countNiniosService,
  getNiniosCumplenMesService,
} from "../services/ninio.services.js";
import Ninio from "../models/ninio.model.js";
import Recorrida from "../models/recorrida.model.js";
import Division from "../models/division.model.js";
import mongoose from "mongoose";

export const registrarNinioController = async (req, res) => {
  const ninioCreado = await registrarNinioService(req, res);
  res.status(201).json(ninioCreado);
};

export const obtenerNiniosController = async (req, res) => {
  const ninios = await getNiniosService(req, res);
  res.json(ninios);
};

export const obtenerNinioPorNombreController = async (req, res) => {
  const ninio = await getNinioByNameService(req, res);
  res.json(ninio);
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
  const ninioActualizado = await actualizarNinioService(req, res);
  res.json(ninioActualizado);
};

export const eliminarNinioController = async (req, res) => {
  const resultadoEliminacion = await eliminarNinioService(req, res);
  res.json(resultadoEliminacion);
};

export const subirFotoNinioController = async (req, res) => {
  await subirFotoNinioService(req, res);
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
