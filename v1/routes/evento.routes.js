import express from "express";

const router = express.Router();

import {
  obtenerEventosController,
  obtenerEventoPorIdController,
  crearEventoController,
  actualizarEventoController,
  eliminarEventoController,
} from "../controllers/evento.controller.js";

import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registrarEventoSchema } from "../validators/evento.validator.js";

router.get("/", obtenerEventosController);
router.get("/:id", obtenerEventoPorIdController);
router.post("/", validateBody(registrarEventoSchema), crearEventoController);
router.put("/:id", actualizarEventoController);
router.delete("/:id", eliminarEventoController);

export default router;
