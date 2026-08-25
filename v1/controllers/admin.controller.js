import Admin from "../models/admin.model.js";
import Animador from "../models/animador.model.js";
import { crearNotificaciones } from "../services/notificacion.services.js";

export const setCordinadorController = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;
  const animador = await Animador.findById(id);
  if (!animador) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  // Allow admin to add or remove supported roles: 'coordinador' and 'economo'
  const supported = ["coordinador", "economo"];
  if (!supported.includes(rol)) {
    return res.status(400).json({ message: "Rol no soportado" });
  }

  const action = req.query.action || req.body.action || "add"; // 'add' or 'remove'
  if (action === "add") {
    animador.roles = Array.from(new Set([...(animador.roles || []), rol]));
  } else if (action === "remove") {
    animador.roles = (animador.roles || []).filter((r) => r !== rol);
  } else {
    return res.status(400).json({ message: "Acción inválida" });
  }

  await animador.save();
  if (action === "add") {
    await crearNotificaciones({
      destinatarios: [animador._id],
      tipo: "rol",
      titulo: "Rol asignado",
      mensaje: `Se te asignó el rol de ${rol}.`,
    });
  }
  res.json({
    message: `Animador ${id} actualizado. Roles: ${animador.roles.join(",")}`,
  });
};

export const setRolesController = async (req, res) => {
  // Bulk set of roles - admin can replace roles array entirely
  const { id } = req.params;
  const { roles } = req.body;
  if (!Array.isArray(roles)) {
    return res.status(400).json({ message: "roles debe ser un arreglo" });
  }
  const allowed = ["animador", "coordinador", "economo", "admin"];
  const invalid = roles.filter((r) => !allowed.includes(r));
  if (invalid.length) {
    return res
      .status(400)
      .json({ message: `Roles inválidos: ${invalid.join(",")}` });
  }
  const animador = await Animador.findById(id);
  if (!animador)
    return res.status(404).json({ message: "Animador no encontrado" });
  animador.roles = roles;
  await animador.save();
  await crearNotificaciones({
    destinatarios: [animador._id],
    tipo: "rol",
    titulo: "Roles actualizados",
    mensaje: `Tus roles ahora son: ${animador.roles.join(", ") || "sin roles"}.`,
  });
  res.json({ message: `Roles actualizados`, roles: animador.roles });
};
