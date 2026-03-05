import {
  getAnimadoresService,
  registerService,
  loginAnimadorService,
  getAnimadorByIdService,
  updateAnimadorService,
} from "../services/animador.services.js";

export const crearAnimadorController = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
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
