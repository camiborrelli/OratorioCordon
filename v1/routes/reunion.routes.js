import { Router } from "express";
import {
  agregarResumenReunionController,
  obtenerReunionesController,
  actualizarResuemenReunionController,
  eliminarResumenReunionController,
} from "../controllers/reunion.controller.js";
import { registrarReunionSchema } from "../validators/reunion.validator.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import auth from "../middlewares/auth.js";
import { autorizarRoles } from "../middlewares/roles.js";

const router = Router();

router.use(auth);

router.post(
  "/",
  autorizarRoles("coordinador", "admin"),
  validateBody(registrarReunionSchema),
  agregarResumenReunionController,
);
router.get("/", obtenerReunionesController);

router.put("/:id", autorizarRoles("coordinador", "admin"), actualizarResuemenReunionController);
router.delete("/:id", autorizarRoles("coordinador", "admin"), eliminarResumenReunionController);

export default router;
