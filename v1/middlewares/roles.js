export const soloCordis = (req, res, next) => {
  if (req.usuario.rol !== "coordinador") {
    return res.status(403).json({
      error: "Acceso solo para coordinadores",
    });
  }
  next();
};
