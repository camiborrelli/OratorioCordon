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
  getAnimadorByIdController,
  quitarRolController,
  animadoresCumplenMesController,
} from "../controllers/animador.controller.js";
import { setCordinadorController } from "../controllers/admin.controller.js";

const router = express.Router();

import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  registrarUsuarioSchema,
  actualizarUsuarioSchema,
} from "../validators/animador.validator.js";
import auth from "../middlewares/auth.js";
import { autorizarPropioOAdmin, autorizarRoles } from "../middlewares/roles.js";

// Register
router.post(
  "/register",
  validateBody(registrarUsuarioSchema),
  crearAnimadorController,
);

router.get("/cumplen-mes", animadoresCumplenMesController);
router.get("/id/:id", getAnimadorByIdController);

// Login (no necesita el esquema completo de registro)
router.post("/login", loginAnimadorController); //la ruta completa es http://localhost:3000/animador/login

// List
router.get("/", obtenerAnimadoresController);

// Create (alternative to /register)
router.post("/", validateBody(registrarUsuarioSchema), crearAnimadorController);

router.post("/verificar-email", verificarEmail);

router.use(auth);

router.post("/:id/quitarRol", autorizarRoles("admin"), quitarRolController);

router.get("/cantidad", contarAnimadoresController);
router.get("/perfil/:id", verPerfilController);
router.post("/:id/:rol", (req, res, next) => {
  req.body = req.body || {};
  if (!req.body.rol) req.body.rol = req.params.rol;
  return autorizarRoles("admin")(req, res, () =>
    setCordinadorController(req, res, next),
  );
});

router.put(
  "/:id",
  autorizarPropioOAdmin,
  validateBody(actualizarUsuarioSchema),
  actualizarAnimadorController,
);
router.put(
  "/cambiar-contrasenia/:id",
  autorizarPropioOAdmin,
  cambiarContraseniaSinLoginController,
);
router.patch("/:id", autorizarPropioOAdmin, actualizarAnimadorController);

router.delete("/:id", autorizarRoles("admin"), eliminarAnimadorController);

export default router;
