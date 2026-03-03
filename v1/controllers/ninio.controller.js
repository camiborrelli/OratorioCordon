import {
  crearNinioService,
  getNiniosService,
  getNinioByNameService,
  actualizarNinioService,
  eliminarNinioService,
} from "../services/ninio.services.js";

export const registrarNinioController = async (req, res) => {
  const ninioCreado = await crearNinioService(req, res);
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

export const actualizarNinioController = async (req, res) => {
  const ninioActualizado = await actualizarNinioService(req, res);
  res.json(ninioActualizado);
};

export const eliminarNinioController = async (req, res) => {
  const resultadoEliminacion = await eliminarNinioService(req, res);
  res.json(resultadoEliminacion);
};
