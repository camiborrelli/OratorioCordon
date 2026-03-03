import Coordinador from "../../models/coordinador.model.js";

export const getCoordinadoresService = async (req, res) => {
  try {
    const coordinadores = await Coordinador.find();
    res.json(coordinadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
