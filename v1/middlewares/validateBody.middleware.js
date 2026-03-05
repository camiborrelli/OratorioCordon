export const validateBody = (schema) => (req, res, next) => {
  // Pre-process common client formats before validation:
  // - Accept `fechaCumple` in DD/MM/YYYY format and convert to Date
  // - Accept `rol` (singular) and map it to `roles` array
  const pre = { ...(req.body || {}) };
  try {
    if (pre && typeof pre.fechaCumple === "string") {
      const m = pre.fechaCumple.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) {
        const day = parseInt(m[1], 10);
        const month = parseInt(m[2], 10) - 1;
        const year = parseInt(m[3], 10);
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) pre.fechaCumple = d;
      }
    }

    if (pre && pre.rol && !pre.roles) {
      pre.roles = Array.isArray(pre.rol) ? pre.rol : [pre.rol];
      delete pre.rol;
    }
  } catch (e) {
    // ignore preprocessing errors
  }

  const { error, value } = schema.validate(pre, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.message, details: error.details });
  }

  req.body = value;
  next();
};
