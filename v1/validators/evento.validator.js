import Joi from "joi";

export const registrarEventoSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del evento es obligatorio",
  }),
  fecha: Joi.date().required().messages({
    "date.empty": "La fecha del evento es obligatoria",
  }),
  descripcion: Joi.string(),
  lugar: Joi.string().required().messages({
    "string.empty": "El lugar del evento es obligatorio",
  }),
});
