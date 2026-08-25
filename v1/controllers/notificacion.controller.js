import Notificacion from "../models/notificacion.model.js";

export async function listarMisNotificacionesController(req, res) {
  try {
    const notificaciones = await Notificacion.find({ destinatario: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function marcarLeidaController(req, res) {
  try {
    const notificacion = await Notificacion.findOneAndUpdate(
      { _id: req.params.id, destinatario: req.user.id },
      { leida: true },
      { new: true },
    );
    if (!notificacion) return res.status(404).json({ message: "Notificación no encontrada" });
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function marcarTodasLeidasController(req, res) {
  try {
    await Notificacion.updateMany({ destinatario: req.user.id, leida: false }, { leida: true });
    res.json({ message: "Notificaciones marcadas como leídas" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
