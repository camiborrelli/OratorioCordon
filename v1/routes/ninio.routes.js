import express from "express";
import {
  registrarNinioController,
  obtenerNiniosController,
  actualizarNinioController,
  eliminarNinioController,
  subirFotoNinioController,
  obtenerNinioPorNombreController,
  contarNiniosController,
  obtenerNinioPorDivisionController,
  obtenerNinioPorRecorridaController,
  obtenerNinioPorIdController,
  getNiniosCumplenMesController,
} from "../controllers/ninio.controller.js";

// import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  registrarNinioSchema,
  actualizarNinioSchema,
} from "../validators/ninio.validator.js";

import multer from "multer";

// Use memory storage so we can upload the buffer to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", obtenerNiniosController); //la ruta es https/
router.get("/cantidad", contarNiniosController);
router.get("/cumplen-mes", getNiniosCumplenMesController);
router.get("/:nombre", obtenerNinioPorNombreController);
router.get("/id/:id", obtenerNinioPorIdController);
router.get("/division/:division", obtenerNinioPorDivisionController);
router.get("/recorrida/:recorrida", obtenerNinioPorRecorridaController);
router.post("/", validateBody(registrarNinioSchema), registrarNinioController);
router.put(
  "/:id",
  validateBody(actualizarNinioSchema),
  actualizarNinioController,
); //la ruta completa es https://localhost:3000/ninios/:id
router.delete("/:id", eliminarNinioController);

// Upload photo for a ninio (multipart/form-data, field `foto`)
router.post("/:id/foto", upload.single("foto"), subirFotoNinioController);

export default router;
