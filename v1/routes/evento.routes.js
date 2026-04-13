import express from "express";

const router = express.Router();

import {
  obtenerEventosController,
  obtenerEventoPorIdController,
  crearEventoController,
  actualizarEventoController,
  eliminarEventoController,
  agregarAnimadorAEventoController,
  getAnimadoresDeEventoController,
  contarEventosController,
  removeAnimadorFromEventoController,
} from "../controllers/evento.controller.js";

import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registrarEventoSchema } from "../validators/evento.validator.js";

router.get("/", obtenerEventosController);
router.get("/:id", obtenerEventoPorIdController);
router.post("/:id/animadores/:animadorId", agregarAnimadorAEventoController);
router.get("/:id/animadores", getAnimadoresDeEventoController);
router.post("/", validateBody(registrarEventoSchema), crearEventoController);
router.post("/", crearEventoController);
router.delete(
  "/:id/animadores/:animadorId",
  removeAnimadorFromEventoController,
);
router.put(
  "/:id",
  validateBody(registrarEventoSchema),
  actualizarEventoController,
);
router.put("/:id", actualizarEventoController);
router.delete("/:id", eliminarEventoController);
router.get("/contar", contarEventosController);

export default router;
