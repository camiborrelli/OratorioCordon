import express from "express";
import {
  registrarNinioController,
  obtenerNiniosController,
  actualizarNinioController,
  eliminarNinioController,
} from "../controllers/ninio.controller.js";

import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  registrarNinioSchema,
  actualizarNinioSchema,
} from "../validators/ninio.validator.js";

router.get("/", obtenerNiniosController);
router.post("/", validateBody(registrarNinioSchema), registrarNinioController);
router.put(
  "/:id",
  validateBody(actualizarNinioSchema),
  actualizarNinioController,
);
// No body validation needed for delete by id; remove undefined `ninioSchema`
router.delete("/:id", eliminarNinioController);

export default router;
