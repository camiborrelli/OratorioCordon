import Recordatorio from "../models/recordatorio.model.js";

export const registrarRecordatorioService = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevoRecordatorio = new Recordatorio({ titulo, descripcion });
    await nuevoRecordatorio.save();
    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
