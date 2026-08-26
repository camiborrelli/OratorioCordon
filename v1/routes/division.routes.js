import express from "express";

const router = express.Router();

import {
  crearDivisionController,
  getDivisionesController,
  obtenerDivisionPorNombreController,
  actualizarDivisionController,
  eliminarDivisionController,
  contarDivisionesController,
} from "../controllers/division.controller.js";

import { registrarDivisionSchema } from "../validators/division.validator.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import auth from "../middlewares/auth.js";
import { autorizarRoles } from "../middlewares/roles.js";

router.use(auth);

router.get("/", getDivisionesController);
router.get("/cantidad", contarDivisionesController);
router.get("/:nombre", obtenerDivisionPorNombreController);
router.post(
  "/",
  autorizarRoles("admin"),
  validateBody(registrarDivisionSchema),
  crearDivisionController,
);
router.put(
  "/:id",
  autorizarRoles("admin"),
  validateBody(registrarDivisionSchema),
  actualizarDivisionController,
);
router.delete("/:id", autorizarRoles("admin"), eliminarDivisionController);

export default router;
