import { getCoordinadoresService } from "../services/coordinador.services.js";
import { eliminarAnimadorService } from "../services/coordinador.services.js";

export const getCoordinadoresController = async (req, res) => {
  const coordinadores = await getCoordinadoresService(req, res);
  res.json(coordinadores);
};

export const eliminarAnimadorController = async (req, res) => {
  const resultadoEliminacion = await eliminarAnimadorService(req, res);
  res.json(resultadoEliminacion);
};
