import express from "express";
import {
  setCordinadorController,
  setRolesController,
} from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";
import { autorizarRoles } from "../middlewares/roles.js";

const router = express.Router();

// Protected routes for admin - consider adding auth middleware
router.post("/animador/:id/role", auth, autorizarRoles("admin"), setCordinadorController); // uses body { rol: 'coordinador'|'economo', action: 'add'|'remove' }

export default router;
