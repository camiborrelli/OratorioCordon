import Ninio from "../models/ninio.model.js";

export const getNiniosService = async (req, res) => {
  try {
    const ninios = await Ninio.find();
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registrarNinioService = async (req, res) => {
  const {
    nombre,
    apellido,
    recorrida,
    division,
    contacto_padres,
    direccion,
    restriccion_alimenticia,
    fecha_cumple,
  } = req.body;
  const nuevoNinio = new Ninio({
    nombre,
    apellido,
    recorrida,
    division,
    contacto_padres,
    direccion,
    restriccion_alimenticia,
    fecha_cumple,
  });
  try {
    const ninioGuardado = await nuevoNinio.save();
    res.status(201).json(ninioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNinioByNameService = async (req, res) => {
  const { nombre } = req.params;
  try {
    const ninios = await Ninio.find({ nombre });
    if (ninios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron niños con ese nombre" });
    }
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarNinioService = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    recorrida,
    division,
    contacto_padres,
    direccion,
    restriccion_alimenticia,
    fecha_cumple,
  } = req.body;
  try {
    const ninioActualizado = await Ninio.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        recorrida,
        division,
        contacto_padres,
        direccion,
        restriccion_alimenticia,
        fecha_cumple,
      },
      { new: true },
    );
    if (!ninioActualizado) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    res.json(ninioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarNinioService = async (req, res) => {
  const { id } = req.params;
  try {
    const ninioEliminado = await Ninio.findByIdAndDelete(id);
    if (!ninioEliminado) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    res.json({ message: "Niño eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
