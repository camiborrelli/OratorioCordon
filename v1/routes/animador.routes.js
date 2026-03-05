import express from "express";
import {
  crearAnimadorController,
  obtenerAnimadoresController,
  loginAnimadorController,
  verPerfilController,
  actualizarAnimadorController,
} from "../controllers/animador.controller.js";

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

// View profile
router.get("/:id", verPerfilController);

// Update
router.put(
  "/:id",
  validateBody(actualizarUsuarioSchema),
  actualizarAnimadorController,
);

export default router;
