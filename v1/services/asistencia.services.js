export const contarTotalAsistenciasPorFechaService = async (fecha) => {
  try {
    const asistencias = await Asistencia.find({ fecha: new Date(fecha) });
    const totalAsistencias = asistencias.length;
    return { fecha, totalAsistencias };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const marcarPresenteService = async (ninioId, fecha) => {
  try {
    const nuevaAsistencia = new Asistencia({
      ninio: ninioId,
      fecha,
      presente: true,
    });
    const asistenciaGuardada = await nuevaAsistencia.save();
    return asistenciaGuardada;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const marcarAusenteService = async (ninioId, fecha) => {
  try {
    const nuevaAsistencia = new Asistencia({
      ninio: ninioId,
      fecha,
      presente: false,
    });
    const asistenciaGuardada = await nuevaAsistencia.save();
    return asistenciaGuardada;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerAsistenciaPorNinioService = async (ninioId) => {
  try {
    const asistencias = await Asistencia.find({ ninio: ninioId });
    return asistencias;
  } catch (error) {
    throw new Error(error.message);
  }
};
