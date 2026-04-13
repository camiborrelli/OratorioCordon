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

router.get("/", getDivisionesController);
router.get("/cantidad", contarDivisionesController);
router.get("/:nombre", obtenerDivisionPorNombreController);
router.post(
  "/",
  validateBody(registrarDivisionSchema),
  crearDivisionController,
);
router.put(
  "/:id",
  validateBody(registrarDivisionSchema),
  actualizarDivisionController,
);
router.delete("/:id", eliminarDivisionController);

export default router;
