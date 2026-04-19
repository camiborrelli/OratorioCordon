import { Router } from "express";
import {
  agregarResumenReunionController,
  obtenerReunionesController,
  actualizarResuemenReunionController,
  eliminarResumenReunionController,
} from "../controllers/reunion.controller.js";
import { registrarReunionSchema } from "../validators/reunion.validator.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";

const router = Router();

router.post(
  "/",
  validateBody(registrarReunionSchema),
  agregarResumenReunionController,
);
router.get("/", obtenerReunionesController);

router.put("/:id", actualizarResuemenReunionController);
router.delete("/:id", eliminarResumenReunionController);

export default router;
