import Animador from "../../models/animador.model.js";

export const getAnimadoresService = async (req, res) => {
  try {
    const animadores = await Animador.find();
    res.json(animadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerService = async (req, res) => {
  const usuarioExistente = await Animador.findOne({
    $or: [{ nombre }, { email }],
  });

  // Verificar si el usuario o email ya existen
  if (usuarioExistente) {
    const error = new Error("Usuario o email ya existe");
    error.status = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const nuevoUsuario = new Animador({
    nombre: nombre,
    password: hashedPassword,
    email: email,
  });

  // Guardar el usuario en la base de datos
  await nuevoUsuario.save();

  const token = jwt.sign(
    {
      id: nuevoUsuario._id,
      username: nuevoUsuario.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  const result = { token };

  return result;
};

export const loginAnimadorService = async (req, res) => {
  const { email, password } = req.body;
  const animador = await Animador.findOne({ email });
  if (!animador || !(await bcrypt.compare(password, animador.password))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const token = jwt.sign(
    {
      id: animador._id,
      username: animador.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  const result = { token };

  return result;
};

export const logoutService = async (req, res) => {
  jwt.sign(
    { id: req.user.id, username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: 0 },
    (logout, err) => {
      if (logout) {
        res.json({ message: "Logout exitoso" });
      } else {
        res.status(500).json({ message: err.message });
      }
    },
  );
};

export const getAnimadorByNameService = async (req, res) => {
  const { nombre } = req.params;
  const animador = await Animador.findOne({ nombre });
  if (!animador) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  res.json(animador);
};

export const getAnimadorByApodoService = async (req, res) => {
  const { apodo } = req.params;
  const animador = await Animador.findOne({ apodo });
  if (!animador) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  res.json(animador);
};

export const getAnimadoresByDivisionService = async (req, res) => {
  const { nombreDivision } = req.params;
  const animadores = await Animador.find({ division: nombreDivision });
  if (animadores.length === 0) {
    return res
      .status(404)
      .json({ message: "Animadores no encontrados para esta división" });
  }
  res.json(animadores);
};

export const getAnimadoresPorRecorridaService = async (req, res) => {
  const { recorrida } = req.params;
  const animadores = await Animador.find({ recorrida });
  if (animadores.length === 0) {
    return res
      .status(404)
      .json({ message: "Animadores no encontrados para esta recorrida" });
  }
  res.json(animadores);
};

export const updateAnimadorService = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, apodo, email, edad, fechaCumple, restricciones } =
    req.body;

  const animadorActualizado = await Animador.findByIdAndUpdate(
    id,
    { nombre, apellido, apodo, email, edad, fechaCumple, restricciones },
    { new: true },
  );
  if (!animadorActualizado) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  res.json(animadorActualizado);
};

// export const deleteAnimadorService = async (req, res) => {
//   const { id } = req.params;
//   const animadorEliminado = await Animador.findByIdAndDelete(id);
//   if (!animadorEliminado) {
//     return res.status(404).json({ message: "Animador no encontrado" });
//   }
//   res.json({ message: "Animador eliminado correctamente" });
// };

export const verPerfilController = async (req, res) => {
  const { id } = req.params;
  const animador = await Animador.findById(id);
  if (!animador) {
    return res.status(404).json({ message: "Animador no encontrado" });
  }
  res.json(animador);
};
