export const validateBody = (schema) => (req, res, next) => {
  // disable conversion/coercion so types must match exactly (e.g., nombre must be a string)
  const { error, value } = schema.validate(req.body, {
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
