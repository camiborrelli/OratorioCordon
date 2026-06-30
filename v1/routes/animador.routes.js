import express from "express";
import {
  crearAnimadorController,
  obtenerAnimadoresController,
  loginAnimadorController,
  verPerfilController,
  actualizarAnimadorController,
  contarAnimadoresController,
  eliminarAnimadorController,
  cambiarContraseniaSinLoginController,
  verificarEmail,
} from "../controllers/animador.controller.js";
import { setCordinadorController } from "../controllers/admin.controller.js";

const router = express.Router();

import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  registrarUsuarioSchema,
  actualizarUsuarioSchema,
} from "../validators/animador.validator.js";

// Register
router.post(
  "/register",
  validateBody(registrarUsuarioSchema),
  crearAnimadorController,
);

// Login (no necesita el esquema completo de registro)
router.post("/login", loginAnimadorController);

// List
router.get("/", obtenerAnimadoresController);

// Create (alternative to /register)
router.post("/", validateBody(registrarUsuarioSchema), crearAnimadorController);

router.post("/verificar-email", verificarEmail);

// View profile (use /id/:id to avoid colliding with literal routes like /register)
router.get("/id/:id", verPerfilController);

router.get("/cantidad", contarAnimadoresController);
router.get("/perfil/:id", verPerfilController);
router.post("/:id/:rol", (req, res, next) => {
  req.body = req.body || {};
  if (!req.body.rol) req.body.rol = req.params.rol;
  return setCordinadorController(req, res, next);
});

router.put(
  "/:id",
  validateBody(actualizarUsuarioSchema),
  actualizarAnimadorController,
);
router.put("/cambiar-contrasenia/:id", cambiarContraseniaSinLoginController);
router.patch("/:id", actualizarAnimadorController);

router.put(
  "/:id",
  validateBody(actualizarUsuarioSchema),
  actualizarAnimadorController,
);
router.delete("/:id", eliminarAnimadorController);

export default router;
