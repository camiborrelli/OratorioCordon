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

import {
  registrarPlanificacionController,
  obtenerPlanificacionController,
} from "../controllers/planificacion.controller.js";
import {
  registrarRecordatorioController,
  obtenerRecordatoriosController,
} from "../controllers/recordatorio.controller.js";

import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registrarEventoSchema } from "../validators/evento.validator.js";
import { soloCordis } from "../middlewares/roles.js";

router.get("/", obtenerEventosController);
router.get("/planificacion", obtenerPlanificacionController);
router.get("/recordatorios", obtenerRecordatoriosController);
router.get("/:id", obtenerEventoPorIdController);
router.post("/:id/animadores/:animadorId", agregarAnimadorAEventoController);
router.get("/:id/animadores", getAnimadoresDeEventoController);
router.post("/", validateBody(registrarEventoSchema), crearEventoController);
router.post("/planificacion", soloCordis, registrarPlanificacionController);
router.post("/recordatorios", soloCordis, registrarRecordatorioController);
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
