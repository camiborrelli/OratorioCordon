import express from "express";
import {
  crearEventoController,
  obtenerEventosController,
  obtenerEventoPorIdController,
  actualizarEventoController,
  agregarAnimadorAEventoController,
  getAnimadoresDeEventoController,
} from "../controllers/evento.controller.js";

const router = express.Router();

router.post("/eventos", crearEventoController);
router.get("/eventos", obtenerEventosController);
router.get("/eventos/:id", obtenerEventoPorIdController);
router.put("/eventos/:id", actualizarEventoController);
router.post(
  "/eventos/:id/animadores/:animadorId",
  agregarAnimadorAEventoController,
);
router.get("/eventos/:id/animadores", getAnimadoresDeEventoController);
