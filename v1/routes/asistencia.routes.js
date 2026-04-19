import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  confirmarAsistenciaController,
  obtenerAsistenciaPorNinioController,
  obtenerAsistenciaPorFechaController,
  obtenerCantFaltasPorNinioController,
  // obtenerAsistenciasController,
  // eliminarAsistenciaController,
  // actualizarAsistenciaController,
} from "../controllers/asistencia.controller.js";

const router = express.Router();

// router.get("/", obtenerAsistenciasController);
router.get("/ninio/:ninioId", obtenerAsistenciaPorNinioController);
router.get("/fecha/:fecha", obtenerAsistenciaPorFechaController);
router.get("/ninio/:ninioId/faltas", obtenerCantFaltasPorNinioController);
router.post("/:id", validateBody, confirmarAsistenciaController);
// router.put(
//   "/:id",
//   validateBody(actualizarAsistenciaSchema),
//   actualizarAsistenciaController,
// );
// router.delete("/:id", eliminarAsistenciaController);

export default router;
