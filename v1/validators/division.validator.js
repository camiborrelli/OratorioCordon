import Joi from "joi";

export const registrarDivisionSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de la división es obligatorio",
  }),
  edadMinima: Joi.number().integer().required().messages({
    "number.base": "La edad mínima debe ser un número",
    "number.empty": "La edad mínima es obligatoria",
  }),
  edadMaxima: Joi.number().integer().required().messages({
    "number.base": "La edad máxima debe ser un número",
    "number.empty": "La edad máxima es obligatoria",
  }),
});
