import {
  getDivisionsService,
  createDivisionService,
  getDivisionByNameService,
  updateDivisionService,
  deleteDivisionService,
} from "../services/division.services.js";

export const getDivisionesController = async (req, res) => {
  const divisions = await getDivisionsService(req, res);
  res.json(divisions);
};

export const crearDivisionController = async (req, res) => {
  const divisionCreada = await createDivisionService(req, res);
  res.status(201).json(divisionCreada);
};

export const obtenerDivisionPorNombreController = async (req, res) => {
  const division = await getDivisionByNameService(req, res);
  res.json(division);
};

export const actualizarDivisionController = async (req, res) => {
  const divisionActualizada = await updateDivisionService(req, res);
  res.json(divisionActualizada);
};

//medio inutil
export const eliminarDivisionController = async (req, res) => {
  const resultadoEliminacion = await deleteDivisionService(req, res);
  res.json(resultadoEliminacion);
};
