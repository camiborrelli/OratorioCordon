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
import auth from "../middlewares/auth.js";
import { autorizarRoles } from "../middlewares/roles.js";

router.use(auth);

router.get("/", obtenerEventosController);
router.get("/recordatorios", obtenerRecordatoriosController);
router.put("/recordatorios/:id", editarRecordatorioController);
router.get("/planificacion", obtenerPlanificacionController);
router.get("/planificaciones", obtenerPlanificacionController);
router.post("/recordatorio", autorizarRoles("coordinador", "admin"), registrarRecordatorioController);
router.post("/recordatorios", autorizarRoles("coordinador", "admin"), registrarRecordatorioController);
router.post("/planificacion", autorizarRoles("coordinador", "admin", "animador"), registrarPlanificacionController);
router.post("/planificaciones", autorizarRoles("coordinador", "admin", "animador"), registrarPlanificacionController);
router.get("/contar", contarEventosController);

router.get("/:id", obtenerEventoPorIdController);
router.post("/:id/animadores/:animadorId", autorizarRoles("coordinador", "admin"), agregarAnimadorAEventoController);
router.get("/:id/animadores", getAnimadoresDeEventoController);
router.post("/", autorizarRoles("coordinador", "admin"), validateBody(registrarEventoSchema), crearEventoController);

router.delete(
  "/:id/animadores/:animadorId",
  autorizarRoles("coordinador", "admin"),
  removeAnimadorFromEventoController,
);
router.put(
  "/:id",
  autorizarRoles("coordinador", "admin"),
  validateBody(registrarEventoSchema),
  actualizarEventoController,
);
router.delete("/:id", autorizarRoles("coordinador", "admin"), eliminarEventoController);

router.post("/recordatorios/:id/hecho", autorizarRoles("coordinador", "admin", "animador"), marcarComoCompletadoController);
router.delete("/recordatorios/:id", autorizarRoles("coordinador", "admin"), eliminarRecordatorioController);
router.delete("/planificaciones/:id", autorizarRoles("coordinador", "admin"), eliminarPlanificacionController);

export default router;
