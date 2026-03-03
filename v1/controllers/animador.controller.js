import {
  getAnimadorByNameService,
  createAnimadorService,
  getAnimadoresService,
  getAnimadorByNameService,
  getAnimadorByApodoService,
  getAnimadoresByDivisionService,
  getAnimadoresPorRecorridaService,
  updateAnimadorService,
  deleteAnimadorService,
} from "../v1/services/animador.service.js";

export const crearAnimadorController = async (req, res) => {
  const animadorCreado = await createAnimadorService(req, res);
  res.status(201).json(animadorCreado);
};

export const obtenerAnimadoresController = async (req, res) => {
  const animadores = await getAnimadoresService(req, res);
  res.json(animadores);
};

export const obtenerAnimadorPorNombreController = async (req, res) => {
  const animador = await getAnimadorByNameService(req, res);
  res.json(animador);
};

export const obtenerAnimadorPorApodoController = async (req, res) => {
  const animador = await getAnimadorByApodoService(req, res);
  res.json(animador);
};

export const obtenerAnimadoresPorDivisionController = async (req, res) => {
  const animadores = await getAnimadoresByDivisionService(req, res);
  res.json(animadores);
};

export const obtenerAnimadoresPorRecorridaController = async (req, res) => {
  const animadores = await getAnimadoresPorRecorridaService(req, res);
  res.json(animadores);
};

export const actualizarAnimadorController = async (req, res) => {
  const animadorActualizado = await updateAnimadorService(req, res);
  res.json(animadorActualizado);
};

// export const eliminarAnimadorController = async (req, res) => {
//   const resultadoEliminacion = await deleteAnimadorService(req, res);
//   res.json(resultadoEliminacion);
// };

export const verPerfilController = async (req, res) => {
  const { id } = req.params;
  const animador = await Animador.findById(id);
  if (!animador) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  res.json(animador);
};
