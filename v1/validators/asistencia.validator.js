import Joi from "joi";

export const registrarAsistenciaSchema = Joi.object({
  fecha: Joi.date().iso().required().messages({
    "any.required": "La fecha es obligatoria",
    "date.format": "La fecha debe tener formato ISO",
  }),
  status: Joi.string().valid("present", "absent", "unmarked").required().messages({
    "any.required": "El estado de asistencia es obligatorio",
    "any.only": "El estado de asistencia no es válido",
  }),
});
