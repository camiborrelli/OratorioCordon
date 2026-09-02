import Joi from "joi";

export const registrarNinioSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().optional().messages({
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

  direccion: Joi.string().optional().allow(""),

  division: Joi.string().required().messages({
    "string.empty": "La división es obligatoria",
  }),
  recorrida: Joi.string().required().messages({
    "string.empty": "La recorrida es obligatoria",
  }),
  foto: Joi.string().optional(),
  observaciones: Joi.string().optional().allow("").messages({
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
      parentesco: Joi.string().optional(),
      relacion: Joi.string().optional(),
    }),
  ),
});

export const actualizarNinioSchema = Joi.object({
  nombre: Joi.string().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  fechaNacimiento: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().allow(""))
    .optional(),

  apellido: Joi.string().messages({
    "string.empty": "El apellido no puede estar vacío",
  }),
  edad: Joi.number().integer().positive().messages({
    "number.base": "La edad debe ser un número",
    "number.integer": "La edad debe ser un número entero",
    "number.positive": "La edad debe ser un número positivo",
  }),
  direccion: Joi.string(),
  foto: Joi.string(),
  observaciones: Joi.string(),
  division: Joi.alternatives().try(Joi.string(), Joi.object()),
  recorrida: Joi.string().valid("rojo", "azul", "naranja", "amarillo"),
  contactos: Joi.array().items(
    Joi.object({
      nombre: Joi.string().messages({
        "string.empty": "El nombre del contacto no puede estar vacío",
      }),
      telefono: Joi.string().messages({
        "string.empty": "El teléfono del contacto no puede estar vacío",
      }),
      parentesco: Joi.string(),
      relacion: Joi.string(),
    }),
  ),
}).min(1);
