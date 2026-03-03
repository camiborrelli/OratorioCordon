import express from "express";
import {
  registrarNinioController,
  obtenerNiniosController,
  actualizarNinioController,
  eliminarNinioController,
} from "../controllers/ninio.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

import { validateBody } from "../middlewares/validation.middleware.js";
import { ninioSchema } from "../schemas/ninio.schema.js";

router.get("/", obtenerNiniosController);
router.post("/", validateBody(ninioSchema), registrarNinioController);
router.put("/:id", validateBody(ninioSchema), actualizarNinioController);
router.delete("/:id", validateBody(ninioSchema), eliminarNinioController);

export default router;
