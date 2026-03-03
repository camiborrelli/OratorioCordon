import Joi from "joi";

export const registrarRecorridaSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de la recorrida es obligatorio",
  }),
});

export const actualizarRecorridaSchema = Joi.object({
  nombre: Joi.string().messages({
    "string.empty": "El nombre de la recorrida no puede estar vacío",
  }),
});
