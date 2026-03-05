import Recorrida from "../models/recorrida.model.js";

export const obtenerRecorridasController = async (req, res) => {
  try {
    const recorridas = await Recorrida.find().populate("ninios animadores");
    res.json(recorridas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearRecorridaController = async (req, res) => {
  const { nombre, color, ninios = [], animadores = [] } = req.body;
  const nuevaRecorrida = new Recorrida({ nombre, color, ninios, animadores });
  try {
    const recorridaGuardada = await nuevaRecorrida.save();
    res.status(201).json(recorridaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerRecorridaPorIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const recorrida =
      await Recorrida.findById(id).populate("ninios animadores");
    if (!recorrida)
      return res.status(404).json({ message: "Recorrida no encontrada" });
    res.json(recorrida);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarRecorridaController = async (req, res) => {
  const { id } = req.params;
  const { nombre, color, ninios, animadores } = req.body;
  try {
    const recorridaActualizada = await Recorrida.findByIdAndUpdate(
      id,
      { nombre, color, ninios, animadores },
      { new: true },
    );
    if (!recorridaActualizada)
      return res.status(404).json({ message: "Recorrida no encontrada" });
    res.json(recorridaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarRecorridaController = async (req, res) => {
  const { id } = req.params;
  try {
    const recorridaEliminada = await Recorrida.findByIdAndDelete(id);
    if (!recorridaEliminada)
      return res.status(404).json({ message: "Recorrida no encontrada" });
    res.json({ message: "Recorrida eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
