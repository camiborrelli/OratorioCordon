import { Router } from "express";
import {
  registrarPlanificacionController,
  obtenerPlanificacionController,
} from "../controllers/planificacion.controller.js";
// import { soloCordis } from "../middlewares/roles.js";

const router = Router();

router.get("/", obtenerPlanificacionController);
router.post("/", registrarPlanificacionController);

export default router;
