import { Router } from "express";
import {
  registrarRecordatorioController,
  obtenerRecordatoriosController,
  marcarComoCompletadoController,
  eliminarRecordatorioController,
} from "../controllers/recordatorio.controller.js";
import Recordatorio from "../models/recordatorio.model.js";
const router = Router();

router.post("/", registrarRecordatorioController);
router.get("/", obtenerRecordatoriosController);
router.post("/:id/hecho", marcarComoCompletadoController);
router.delete("/:id", eliminarRecordatorioController);

export default router;
