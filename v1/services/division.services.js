import Division from "../models/division.model.js";

export const getDivisionsService = async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDivisionService = async (req, res) => {
  const { nombre, edadMin, edadMax } = req.body;
  const nuevaDivision = new Division({ nombre, edadMin, edadMax });
  const divisionGuardada = await nuevaDivision.save();
  res.status(201).json(divisionGuardada);
};

export const getDivisionByNameService = async (req, res) => {
  const { nombre } = req.params;
  const division = await Division.findOne({ nombre });
  if (!division) {
    return res.status(404).json({ message: "División no encontrada" });
  }
  res.json(division);
};

export const updateDivisionService = async (req, res) => {
  const { id } = req.params;
  const { nombre, edadMin, edadMax } = req.body;

  const divisionActualizada = await Division.findByIdAndUpdate(
    id,
    { nombre, edadMin, edadMax },
    { new: true },
  );

  if (!divisionActualizada) {
    return res.status(404).json({ message: "División no encontrada" });
  }
  res.json(divisionActualizada);
};
