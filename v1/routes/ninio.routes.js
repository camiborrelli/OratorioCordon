import express from "express";
import {
  registrarNinioController,
  obtenerNiniosController,
  actualizarNinioController,
  eliminarNinioController,
  obtenerNinioPorNombreController,
  contarNiniosController,
  obtenerNinioPorDivisionController,
  obtenerNinioPorRecorridaController,
  obtenerNinioPorIdController,
  getNiniosCumplenMesController,
  cambiarDivisionNinioController,
  getNiniosEliminadosController,
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
router.get("/eliminados", getNiniosEliminadosController);
router.post("/", validateBody(registrarNinioSchema), registrarNinioController);
router.put(
  "/:id",

  actualizarNinioController,
); //la ruta completa es https://localhost:3000/ninios/:id
router.delete("/:id", eliminarNinioController);
router.put("/cambiarDivision/:id", cambiarDivisionNinioController);

export default router;
