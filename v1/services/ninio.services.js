import Ninio from "../models/ninio.model.js";

export const getNiniosService = async (req, res) => {
  try {
    const ninios = await Ninio.find();
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const countNiniosService = async () => {
  return await Ninio.countDocuments();
};

export const registrarNinioService = async (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    recorrida,
    division,
    contactos,
    direccion,
    observaciones,
    fechaNacimiento,
    foto,
  } = req.body;
  // Normalize and validate fechaNacimiento
  let fecha_nacimiento = undefined;
  if (fechaNacimiento !== undefined && fechaNacimiento !== "") {
    const parsed = new Date(fechaNacimiento);
    if (isNaN(parsed.getTime())) {
      return res.status(400).json({ message: "Fecha de nacimiento inválida" });
    }
    fecha_nacimiento = parsed;
  }
  const contactosNormalizados = Array.isArray(contactos)
    ? contactos.map((c) => {
        if (c.parentesco === undefined && c.relacion !== undefined) {
          return { ...c, parentesco: c.relacion };
        }
        return c;
      })
    : contactos;

  const nuevoNinio = new Ninio({
    nombre,
    apellido,
    edad,
    recorrida,
    division,
    contactos: contactosNormalizados,
    direccion,
    observaciones,
    fecha_nacimiento,
    foto,
  });
  try {
    const existente = await Ninio.findOne({ nombre, apellido });
    if (existente) {
      return res
        .status(409)
        .json({ message: "Ya existe un niño con ese nombre y apellido" });
    }
    const ninioGuardado = await nuevoNinio.save();
    agregarNinioARecorrida(ninioGuardado._id, recorrida);
    agregarNinioAdivision(ninioGuardado._id, division);
    res.status(201).json(ninioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function agregarNinioARecorrida(ninioId, recorridaId) {
  if (!recorridaId) return;
  try {
    const Recorrida = (await import("./recorrida.services.js")).default;
    await Recorrida.findByIdAndUpdate(recorridaId, {
      $addToSet: { ninios: ninioId },
    });
  } catch (error) {
    console.error("Error al agregar niño a recorrida:", error.message);
  }
}

async function agregarNinioAdivision(ninioId, divisionId) {
  if (!divisionId) return;
  try {
    const Division = (await import("./division.services.js")).default;
    await Division.findByIdAndUpdate(divisionId, {
      $addToSet: { ninios: ninioId },
    });
  } catch (error) {
    console.error("Error al agregar niño a división:", error.message);
  }
}

export const getNinioByNameService = async (req, res) => {
  const { nombre } = req.params;
  try {
    const ninios = await Ninio.find({ nombre });
    if (ninios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron niños con ese nombre" });
    }
    res.json(ninios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarNinioService = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    edad,
    recorrida,
    division,
    contactos,
    direccion,
    observaciones,
    fechaNacimiento,
    foto,
  } = req.body;
  // Normalize and validate fechaNacimiento for updates
  let fecha_nacimiento = undefined;
  if (fechaNacimiento !== undefined && fechaNacimiento !== "") {
    const parsed = new Date(fechaNacimiento);
    if (isNaN(parsed.getTime())) {
      return res.status(400).json({ message: "Fecha de nacimiento inválida" });
    }
    fecha_nacimiento = parsed;
  }
  try {
    // Normalize contactos in updates (accept frontend using 'relacion')
    const contactosNormalizados = Array.isArray(contactos)
      ? contactos.map((c) => {
          if (c.parentesco === undefined && c.relacion !== undefined) {
            return { ...c, parentesco: c.relacion };
          }
          return c;
        })
      : contactos;

    const ninioActualizado = await Ninio.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        edad,
        recorrida,
        division,
        contactos: contactosNormalizados,
        direccion,
        observaciones,
        ...(fecha_nacimiento !== undefined ? { fecha_nacimiento } : {}),
        foto,
      },
      { new: true },
    );
    if (!ninioActualizado) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    res.json(ninioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const subirFotoNinioService = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.file)
      return res.status(400).json({ message: "No se recibió archivo" });
    const rutaPublica = `/uploads/${req.file.filename}`;
    const ninioActualizado = await Ninio.findByIdAndUpdate(
      id,
      { foto: rutaPublica },
      { new: true },
    );
    if (!ninioActualizado)
      return res.status(404).json({ message: "Niño no encontrado" });
    res.json(ninioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarNinioService = async (req, res) => {
  const { id } = req.params;
  try {
    const ninioEliminado = await Ninio.findByIdAndDelete(id);
    if (!ninioEliminado) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    res.json({ message: "Niño eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNiniosCumplenMesService = async (mes) => {
  try {
    // normalize mes: accept '3', '03', or number; default to current month
    let monthNum = parseInt(mes, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      const now = new Date();
      monthNum = now.getMonth() + 1;
    }
    // Fetch all docs that have a fecha_nacimiento, then filter by month in JS
    const docs = await Ninio.find({
      fecha_nacimiento: { $exists: true, $ne: null },
    }).lean();
    return docs.filter((n) => {
      if (!n.fecha_nacimiento) return false;
      const d = new Date(n.fecha_nacimiento);
      if (isNaN(d.getTime())) return false;
      return d.getMonth() + 1 === monthNum;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
