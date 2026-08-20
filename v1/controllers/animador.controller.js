import {
  getAnimadoresService,
  registerService,
  loginAnimadorService,
  getAnimadorByIdService,
  updateAnimadorService,
  contarAnimadoresService,
  eliminarAnimadorService,
  getAnimadorPorEmail,
  quitarRolService,
} from "../services/animador.services.js";

import Animador from "../models/animador.model.js";
import bcrypt from "bcryptjs";

export const crearAnimadorController = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const contarAnimadoresController = async (req, res) => {
  const count = await contarAnimadoresService();
  res.json({ count });
};

export const loginAnimadorController = async (req, res) => {
  try {
    const result = await loginAnimadorService(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const obtenerAnimadoresController = async (req, res) => {
  try {
    const animadores = await getAnimadoresService();
    res.json(animadores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verPerfilController = async (req, res) => {
  try {
    const { id } = req.params;
    const animador = await getAnimadorByIdService(id);
    res.json(animador);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const actualizarAnimadorController = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateAnimadorService(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const validarUsuarioTokenController = async (req, res) => {
  res.status(200).json({
    message: "Token valido",
  });
};

export const eliminarController = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarAnimadorService(id);
    if (!resultado) {
      return res.status(404).json({ message: "Animador no encontrado" });
    }
    res.json({ message: "Animador eliminado correctamente" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const eliminarAnimadorController = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarAnimadorService(id);
    if (!resultado) {
      return res.status(404).json({ message: "Animador no encontrado" });
    }
    res.json({ message: "Animador eliminado correctamente" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const verificarEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email es requerido" });
    }

    const animador = await getAnimadorPorEmail(email);
    if (!animador) {
      return res.status(404).json({ error: "Email no encontrado" });
    }

    // Verificar contraseña con bcrypt
    // const passwordValida = await bcrypt.compare(password, usuario.password);
    // if (!passwordValida) {
    //   return res.status(404).json({ error: "Email o contraseña incorrectos" });
    // }

    res.status(200).json({
      message: "Email verificado correctamente",
      existe: true,
      animadorId: animador._id,
    });
  } catch (error) {
    console.error("Error al verificar email:", error);
    res.status(500).json({
      error: "Error al verificar email",
    });
  }
};

export const cambiarContraseniaSinLoginController = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    console.log("ID:", id);
    console.log("Body recibido:", req.body);
    console.log("nuevaContraseña:", newPassword);

    if (!newPassword) {
      return res.status(400).json({ error: "La contraseña es requerida" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const animador = await Animador.findById(id);
    if (!animador) {
      return res.status(404).json({ error: "Animador no encontrado" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    animador.password = passwordHash;
    const animadorActualizado = await animador.save();

    const { password, ...animadorSinPassword } = animadorActualizado.toObject();

    res.status(200).json({
      message: "Contraseña cambiada exitosamente",
      usuario: animadorSinPassword,
    });
  } catch (error) {
    console.error("Error en cambiarContraseniaSinLogin:", error);
    res.status(500).json({
      error: error.message || "Error al cambiar contraseña",
    });
  }
};

export const getAnimadorByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const animador = await getAnimadorByIdService(id);
    res.json(animador);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const quitarRolController = async (req, res) => {
  try {
    const { id } = req.params;
    const animador = await getAnimadorByIdService(id);
    const animadorNoCordi = await quitarRolService(id);
    res.json(animadorNoCordi);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
