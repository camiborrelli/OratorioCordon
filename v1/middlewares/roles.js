export const soloCordis = (req, res, next) => {
  const usuario = req.user || req.usuario;

  if (!usuario || usuario.rol !== "coordinador") {
    return res.status(403).json({
      error: "Acceso solo para coordinadores",
    });
  }

  next();
};
