import Ninio from "../models/ninio.model.js";
import Asistencia from "../models/asistencia.model.js";

export const marcarPresenteController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const { fecha, presente } = req.body;

    const nuevaAsistencia = new Asistencia({ ninio: ninioId, fecha, presente });
    const asistenciaGuardada = await nuevaAsistencia.save();
    res.status(201).json(asistenciaGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const marcarAusenteController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const { fecha } = req.body;
    const nuevaAsistencia = new Asistencia({
      ninio: ninioId,
      fecha,
      presente: false,
    });
    const asistenciaGuardada = await nuevaAsistencia.save();
    res.status(201).json(asistenciaGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerAsistenciaPorNinioController = async (req, res) => {
  try {
    const { ninioId } = req.params;
    const asistencias = await Asistencia.find({ ninio: ninioId });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerAsistenciaPorFechaController = async (req, res) => {
  try {
    const { fecha } = req.params;
    const asistencias = await contarTotalAsistenciasPorFechaService(fecha);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
