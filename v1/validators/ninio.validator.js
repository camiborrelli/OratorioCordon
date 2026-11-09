import Joi from "joi";

export const registrarNinioSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().allow("").optional().messages({
    "string.empty": "El apellido no puede estar vacío",
  }),
  edad: Joi.number().integer().positive().optional().messages({
    "number.base": "La edad debe ser un número",
    "number.integer": "La edad debe ser un número entero",
    "number.positive": "La edad debe ser un número positivo",
  }),
  fechaNacimiento: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().allow(""))
    .optional()
    .messages({
      "date.format": "La fecha debe respetar formato ISO",
    }),

  direccion: Joi.string().allow("").optional(),

  division: Joi.string().required().messages({
    "string.empty": "La división es obligatoria",
  }),
  recorrida: Joi.string().required().messages({
    "string.empty": "La recorrida es obligatoria",
  }),
  foto: Joi.string().allow("").optional(),
  observaciones: Joi.string().allow("").optional().messages({
    "string.base": "Las observaciones deben ser texto",
  }),
  contactos: Joi.array().items(
    Joi.object({
      nombre: Joi.string().required().messages({
        "string.empty": "El nombre del contacto es obligatorio",
      }),
      telefono: Joi.string().required().messages({
        "string.empty": "El teléfono del contacto es obligatorio",
      }),
      parentesco: Joi.string().allow("").optional(),
      relacion: Joi.string().allow("").optional(),
    }),
  ).optional(),
});

export const actualizarNinioSchema = Joi.object({
  nombre: Joi.string().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  fechaNacimiento: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().allow(""))
    .optional(),

  apellido: Joi.string().allow("").optional().messages({
    "string.empty": "El apellido no puede estar vacío",
  }),
  edad: Joi.number().integer().positive().optional().messages({
    "number.base": "La edad debe ser un número",
    "number.integer": "La edad debe ser un número entero",
    "number.positive": "La edad debe ser un número positivo",
  }),
  direccion: Joi.string().allow("").optional(),
  foto: Joi.string().allow("").optional(),
  observaciones: Joi.string().allow("").optional(),
  division: Joi.alternatives().try(Joi.string().allow(""), Joi.object()).optional(),
  recorrida: Joi.string().allow("").optional(),
  contactos: Joi.array().items(
    Joi.object({
      nombre: Joi.string().messages({
        "string.empty": "El nombre del contacto no puede estar vacío",
      }),
      telefono: Joi.string().messages({
        "string.empty": "El teléfono del contacto no puede estar vacío",
      }),
      parentesco: Joi.string().allow("").optional(),
      relacion: Joi.string().allow("").optional(),
    }),
  ).optional(),
}).min(1);
