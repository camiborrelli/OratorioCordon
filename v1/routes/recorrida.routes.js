import express from "express";
import {
  obtenerRecorridasController,
  crearRecorridaController,
  obtenerRecorridaPorIdController,
  actualizarRecorridaController,
  eliminarRecorridaController,
} from "../controllers/recorrida.controller.js";

const router = express.Router();
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  registrarRecorridaSchema,
  actualizarRecorridaSchema,
} from "../validators/recorrida.validator.js";

router.post(
  "/",
  validateBody(registrarRecorridaSchema),
  crearRecorridaController,
);
router.get("/", obtenerRecorridasController);
router.get("/:id", obtenerRecorridaPorIdController);
router.put(
  "/:id",
  validateBody(actualizarRecorridaSchema),
  actualizarRecorridaController,
);
router.delete("/:id", eliminarRecorridaController);

export default router;
