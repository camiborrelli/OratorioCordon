import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registrarAsistenciaSchema } from "../validators/asistencia.validator.js";
import auth from "../middlewares/auth.js";
import { autorizarRoles } from "../middlewares/roles.js";
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
router.use(auth);
router.get("/ninio/:ninioId", obtenerAsistenciaPorNinioController);
router.get("/fecha/:fecha", obtenerAsistenciaPorFechaController);
router.get("/ninio/:ninioId/faltas", obtenerCantFaltasPorNinioController);
router.post("/:ninioId", autorizarRoles("coordinador", "admin"), validateBody(registrarAsistenciaSchema), confirmarAsistenciaController);
// router.put(
//   "/:id",
//   validateBody(actualizarAsistenciaSchema),
//   actualizarAsistenciaController,
// );
// router.delete("/:id", eliminarAsistenciaController);

export default router;
