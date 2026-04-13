import Coordinador from "../../models/coordinador.model.js";

export const getCoordinadoresService = async (req, res) => {
  try {
    const coordinadores = await Coordinador.find();
    res.json(coordinadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearCoordinadorService = async (req, res) => {
  const { nombre, apellido, email } = req.body;
  const nuevoCoordinador = new Coordinador({ nombre, apellido, email });
  try {
    const coordinadorGuardado = await nuevoCoordinador.save();
    res.status(201).json(coordinadorGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarAnimadorService = async (req, res) => {
  const { id } = req.params;
  try {
    const animadorEliminado = await Coordinador.findByIdAndDelete(id);
    if (!animadorEliminado) {
      return res.status(404).json({ message: "Animador no encontrado" });
    }
    res.json({ message: "Animador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
