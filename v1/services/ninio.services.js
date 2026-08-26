import Ninio from "../models/ninio.model.js";
import Division from "../models/division.model.js";

export const getNiniosService = async () => Ninio.find();

export const countNiniosService = async () => {
  return await Ninio.countDocuments();
};

export const registrarNinioService = async (body) => {
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
  } = body;
  // Normalize and validate fechaNacimiento
  let fecha_nacimiento = undefined;
  if (fechaNacimiento !== undefined && fechaNacimiento !== "") {
    const parsed = new Date(fechaNacimiento);
    if (isNaN(parsed.getTime())) {
      const error = new Error("Fecha de nacimiento inválida");
      error.status = 400;
      throw error;
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

  // Resolve division to its nombre so Ninio.division stays as text
  let divisionNombre = division;
  let divisionDoc = null;
  try {
    if (division !== undefined && division !== null) {
      let input = division;
      if (typeof input === "object" && input !== null) {
        if (input._id) input = String(input._id);
        else if (input.id) input = String(input.id);
        else if (input.nombre) input = String(input.nombre);
        else input = String(JSON.stringify(input));
      }
      input = String(input).trim();
      if (input && /^[0-9a-fA-F]{24}$/.test(input)) {
        divisionDoc = await Division.findById(input);
      } else {
        const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
        const regex = new RegExp(`^${escapeRegex(input)}$`, "iu");
        divisionDoc = await Division.findOne({ nombre: { $regex: regex } });
      }
      if (divisionDoc) divisionNombre = divisionDoc.nombre;
    }
  } catch (err) {
    console.error("Error resolviendo división:", err.message);
  }

  const nuevoNinio = new Ninio({
    nombre,
    apellido,
    edad,
    recorrida,
    division: divisionNombre,
    contactos: contactosNormalizados,
    direccion,
    observaciones,
    fecha_nacimiento,
  });
  try {
    const existente = await Ninio.findOne({ nombre });
    if (existente) {
      const error = new Error("Ya existe un niño con ese nombre");
      error.status = 409;
      throw error;
    }
    const ninioGuardado = await nuevoNinio.save();
    agregarNinioARecorrida(ninioGuardado._id, recorrida);
    if (divisionDoc) {
      agregarNinioAdivision(ninioGuardado._id, divisionDoc._id);
    }
    return ninioGuardado;
  } catch (error) {
    if (!error.status) error.status = 400;
    throw error;
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

export const getNinioByNameService = async (nombre) => {
  try {
    const ninios = await Ninio.find({ nombre });
    if (ninios.length === 0) {
      const error = new Error("No se encontraron niños con ese nombre");
      error.status = 404;
      throw error;
    }
    return ninios;
  } catch (error) {
    if (!error.status) error.status = 500;
    throw error;
  }
};

export const actualizarNinioService = async (id, body) => {
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
  } = body;
  // Normalize and validate fechaNacimiento for updates
  let fecha_nacimiento = undefined;
  if (fechaNacimiento !== undefined && fechaNacimiento !== "") {
    const parsed = new Date(fechaNacimiento);
    if (isNaN(parsed.getTime())) {
      const error = new Error("Fecha de nacimiento inválida");
      error.status = 400;
      throw error;
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

    // Resolve division input to nombre when updating
    let divisionNombre = division;
    let divisionDoc = null;
    if (division !== undefined && division !== null) {
      try {
        let input = division;
        if (typeof input === "object" && input !== null) {
          if (input._id) input = String(input._id);
          else if (input.id) input = String(input.id);
          else if (input.nombre) input = String(input.nombre);
          else input = String(JSON.stringify(input));
        }
        input = String(input).trim();
        if (input && /^[0-9a-fA-F]{24}$/.test(input)) {
          divisionDoc = await Division.findById(input);
        } else {
          const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
          const regex = new RegExp(`^${escapeRegex(input)}$`, "iu");
          divisionDoc = await Division.findOne({ nombre: { $regex: regex } });
        }
        if (divisionDoc) divisionNombre = divisionDoc.nombre;
      } catch (err) {
        console.error(
          "Error resolviendo división en actualización:",
          err.message,
        );
      }
    }

    const ninioActualizado = await Ninio.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        edad,
        recorrida,
        division: divisionNombre,
        contactos: contactosNormalizados,
        direccion,
        observaciones,
        ...(fecha_nacimiento !== undefined ? { fecha_nacimiento } : {}),
      },
      { new: true },
    );
    if (!ninioActualizado) {
      const error = new Error("Niño no encontrado");
      error.status = 404;
      throw error;
    }
    return ninioActualizado;
  } catch (error) {
    if (!error.status) error.status = 400;
    throw error;
  }
};

const niniosEliminados = [];

export const eliminarNinioService = async (id) => {
  try {
    const ninioEliminado = await Ninio.findByIdAndDelete(id);
    if (!ninioEliminado) {
      const error = new Error("Niño no encontrado");
      error.status = 404;
      throw error;
    }
    niniosEliminados.push(ninioEliminado);
    return ninioEliminado;
  } catch (error) {
    if (!error.status) error.status = 500;
    throw error;
  }
};

export const getNiniosEliminadosService = () => {
  return niniosEliminados;
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
