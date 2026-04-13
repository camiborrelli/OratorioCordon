import Joi from "joi";

export const registrarEventoSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del evento es obligatorio",
  }),
  // Accept either a date-only string YYYY-MM-DD (time optional) or a full ISO datetime
  fecha: Joi.alternatives()
    .try(Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/), Joi.date())
    .required()
    .messages({
      "any.required": "La fecha del evento es obligatoria",
      "string.pattern.base":
        "La fecha debe tener formato YYYY-MM-DD o ser una fecha ISO",
      "date.base": "La fecha del evento debe ser una fecha válida",
    }),
  descripcion: Joi.string(),
  lugar: Joi.string().required().messages({
    "string.empty": "El lugar del evento es obligatorio",
  }),
});
