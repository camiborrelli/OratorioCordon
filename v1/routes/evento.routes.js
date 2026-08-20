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
  eliminarPlanificacionController,
} from "../controllers/planificacion.controller.js";
import {
  registrarRecordatorioController,
  obtenerRecordatoriosController,
  editarRecordatorioController,
  marcarComoCompletadoController,
  eliminarRecordatorioController,
} from "../controllers/recordatorio.controller.js";

import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registrarEventoSchema } from "../validators/evento.validator.js";

router.get("/", obtenerEventosController);
router.get("/recordatorios", obtenerRecordatoriosController);
router.put("/recordatorios/:id", editarRecordatorioController);
router.get("/planificacion", obtenerPlanificacionController);
router.get("/planificaciones", obtenerPlanificacionController);
router.post("/recordatorio", registrarRecordatorioController);
router.post("/recordatorios", registrarRecordatorioController);
router.post("/planificacion", registrarPlanificacionController);
router.post("/planificaciones", registrarPlanificacionController);

router.get("/:id", obtenerEventoPorIdController);
router.post("/:id/animadores/:animadorId", agregarAnimadorAEventoController);
router.get("/:id/animadores", getAnimadoresDeEventoController);
router.post("/", validateBody(registrarEventoSchema), crearEventoController);

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

router.post("/recordatorios/:id/hecho", marcarComoCompletadoController);
router.delete("/recordatorios/:id", eliminarRecordatorioController);
router.delete("/planificaciones/:id", eliminarPlanificacionController); //la ruta es

export default router;
