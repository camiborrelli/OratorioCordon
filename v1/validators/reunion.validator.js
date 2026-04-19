import Joi from "joi";

export const registrarReunionSchema = Joi.object({
  fecha: Joi.date().iso().required().messages({
    "date.base": "La fecha de la reunión debe ser una fecha válida",
    "date.format": "La fecha de la reunión debe tener formato ISO",
    "any.required": "La fecha de la reunión es obligatoria",
  }),
  titulo: Joi.string().required().messages({
    "string.empty": "El título de la reunión es obligatorio",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripción de la reunión es obligatoria",
  }),
});

export const actualizarReunionSchema = Joi.object({
  fecha: Joi.date().iso().messages({
    "date.base": "La fecha de la reunión debe ser una fecha válida",
    "date.format": "La fecha de la reunión debe tener formato ISO",
  }),
  titulo: Joi.string().messages({
    "string.empty": "El título de la reunión no puede estar vacío",
  }),
  descripcion: Joi.string().messages({
    "string.empty": "La descripción de la reunión no puede estar vacía",
  }),
});
