import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  listarMisNotificacionesController,
  marcarLeidaController,
  marcarTodasLeidasController,
} from "../controllers/notificacion.controller.js";

const router = Router();

router.get("/", auth, listarMisNotificacionesController);
router.put("/leer-todas", auth, marcarTodasLeidasController);
router.put("/:id/leer", auth, marcarLeidaController);

export default router;
