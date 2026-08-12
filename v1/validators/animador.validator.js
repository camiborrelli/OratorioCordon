import Joi from "joi";

export const registrarUsuarioSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido es obligatorio",
    "string.pattern.base": "El apellido debe contener solo letras y espacios",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email es obligatorio",
    "string.email": "El email debe ser válido",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
  fechaCumple: Joi.date().required().messages({
    "date.base": "La fecha de cumpleaños debe ser una fecha válida",
    "date.empty": "La fecha de cumpleaños es obligatoria",
  }),
  apodo: Joi.string(),

  division: Joi.string()
    .required()
    .valid("chiquitos", "medianitos", "medianos", "grandes")
    .required()
    .messages({
      "string.base": "La división debe ser una de las opciones válidas",
      "any.only":
        "La división debe ser una de las siguientes: chiquitos, medianitos, medianos, grandes",
      "string.empty": "La división es obligatoria",
    }),
  recorrida: Joi.string()
    .required()
    .valid("roja", "azul", "naranja", "amarilla")
    .messages({
      "string.base": "La recorrida debe ser una de las opciones válidas",
      "any.only":
        "La recorrida debe ser una de las siguientes: roja, azul, naranja, amarilla",
      "string.empty": "La recorrida es obligatoria",
    }),
  roles: Joi.array()
    .items(Joi.string().valid("animador", "coordinador", "economo", "admin"))
    .default(["animador"])
    .messages({
      "array.base": "Los roles deben ser un arreglo",
      "any.only":
        "Cada rol debe ser uno de: animador, coordinador_general, coordinador_A, coordinador_B, coordinador, economo, admin",
    }),
});

export const actualizarUsuarioSchema = Joi.object({
  nombre: Joi.string().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.pattern.base": "El nombre debe contener solo letras y espacios",
  }),
  apellido: Joi.string().messages({
    "string.empty": "El apellido no puede estar vacío",
    "string.pattern.base": "El apellido debe contener solo letras y espacios",
  }),
  email: Joi.string().email().messages({
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe ser válido",
  }),
  password: Joi.string().min(6).messages({
    "string.empty": "La contraseña no puede estar vacía",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
  telefono: Joi.string()
    .length(9)
    .pattern(/^[0-9]{9}$/)
    .messages({
      "string.empty": "El teléfono no puede estar vacío",
      "string.length": "El teléfono debe tener 9 caracteres",
      "string.pattern.base": "El teléfono debe contener solo números",
    }),
  fechaCumple: Joi.date().messages({
    "date.base": "La fecha de cumpleaños debe ser una fecha válida",
    "date.empty": "La fecha de cumpleaños no puede estar vacía",
  }),
  apodo: Joi.string(),
  restricciones: Joi.string().allow("").messages({
    "string.base": "Las restricciones deben ser una cadena de texto",
  }),
  division: Joi.string()
    .valid("chiquitos", "medianitos", "medianos", "grandes")
    .messages({
      "string.base": "La división debe ser una de las opciones válidas",
      "any.only":
        "La división debe ser una de las siguientes: chiquitos, medianitos, medianos, grandes",
    }),
  recorrida: Joi.alternatives()
    .try(
      Joi.array().items(
        Joi.string().valid("rojo", "azul", "naranja", "amarillo"),
      ),
      Joi.string().valid("rojo", "azul", "naranja", "amarillo"),
    )
    .messages({
      "array.base": "La recorrida debe ser un arreglo o un string",
      "string.base": "La recorrida debe ser una de las opciones válidas",
      "any.only":
        "La recorrida debe ser una de las siguientes: rojo, azul, naranja, amarillo",
    }),
  roles: Joi.array()
    .items(Joi.string().valid("animador", "coordinador", "economo", "admin"))
    .messages({
      "array.base": "Los roles deben ser un arreglo",
      "any.only":
        "Cada rol debe ser uno de: animador, coordinador, economo, admin",
    }),
});

export default {
  registrarUsuarioSchema,
  actualizarUsuarioSchema,
};
