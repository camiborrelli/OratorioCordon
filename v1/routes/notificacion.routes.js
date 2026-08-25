import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  listarMisNotificacionesController,
  marcarLeidaController,
  marcarTodasLeidasController,
  eliminarNotificacionController,
} from "../controllers/notificacion.controller.js";

const router = Router();

router.get("/", auth, listarMisNotificacionesController);
router.put("/leer-todas", auth, marcarTodasLeidasController);
router.put("/:id/leer", auth, marcarLeidaController);
router.delete("/:id", auth, eliminarNotificacionController);

export default router;
