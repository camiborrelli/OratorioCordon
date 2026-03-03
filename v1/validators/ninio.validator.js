import Joi from "joi";

export const registrarNinioSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido es obligatorio",
    "string.pattern.base": "El apellido debe contener solo letras y espacios",
  }),
  fechaNacimiento: Joi.date().required().messages({
    "date.empty": "La fecha de nacimiento es obligatoria",
  }),
  divisionId: Joi.number().integer().required(),
});

export const actualizarNinioSchema = Joi.object({
  nombre: Joi.string().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().messages({
    "string.empty": "El apellido no puede estar vacío",
    "string.pattern.base": "El apellido debe contener solo letras y espacios",
  }),
  fechaNacimiento: Joi.date().messages({
    "date.empty": "La fecha de nacimiento no puede estar vacía",
  }),
  divisionId: Joi.number().integer(),
});
