import express from "express";
import {
  obtenerRecorridasController,
  crearRecorridaController,
  obtenerRecorridaPorIdController,
  actualizarRecorridaController,
  eliminarRecorridaController,
} from "../controllers/recorrida.controller.js";

const router = express.Router();
import { validateBody } from "../middlewares/validation.middleware.js";
import { recorridaSchema } from "../schemas/recorrida.schema.js";

router.get("/", obtenerRecorridasController);
router.post("/", validateBody(recorridaSchema), crearRecorridaController);
router.get("/:id", obtenerRecorridaPorIdController);
router.put(
  "/:id",
  validateBody(recorridaSchema),
  actualizarRecorridaController,
);
router.delete("/:id", eliminarRecorridaController);

export default router;
