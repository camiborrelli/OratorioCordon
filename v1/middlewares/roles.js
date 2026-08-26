import Animador from "../models/animador.model.js";

export const autorizarRoles = (...rolesPermitidos) => async (req, res, next) => {
  try {
    const usuario = await Animador.findById(req.user?.id).select("roles");
    if (!usuario || !usuario.roles?.some((rol) => rolesPermitidos.includes(rol))) {
      return res.status(403).json({ error: "No tenés permisos para realizar esta acción" });
    }
    req.user.roles = usuario.roles;
    next();
  } catch (error) {
    res.status(500).json({ message: "No se pudieron verificar los permisos" });
  }
};

export const soloCordis = autorizarRoles("coordinador", "admin");

export const autorizarPropioOAdmin = async (req, res, next) => {
  try {
    if (String(req.user?.id) === String(req.params.id)) return next();
    const usuario = await Animador.findById(req.user?.id).select("roles");
    if (usuario?.roles?.includes("admin")) return next();
    return res.status(403).json({ error: "Solo podés modificar tu propio perfil" });
  } catch (error) {
    res.status(500).json({ message: "No se pudieron verificar los permisos" });
  }
};
