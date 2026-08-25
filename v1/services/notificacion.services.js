import nodemailer from "nodemailer";
import Animador from "../models/animador.model.js";
import Notificacion from "../models/notificacion.model.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function crearNotificaciones({ destinatarios, tipo, titulo, mensaje }) {
  const ids = [...new Set(destinatarios.map((id) => String(id)))];
  if (!ids.length) return [];

  const animadores = await Animador.find({ _id: { $in: ids } }).select("email nombre apellido");
  const notificaciones = await Notificacion.insertMany(
    animadores.map((animador) => ({
      destinatario: animador._id,
      tipo,
      titulo,
      mensaje,
    })),
  );

  const mailer = getTransporter();
  if (!mailer) {
    console.warn("[notificaciones] SMTP no configurado: las notificaciones quedaron disponibles en la app.");
    return notificaciones;
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  await Promise.allSettled(
    animadores.filter((animador) => animador.email).map((animador) =>
      mailer.sendMail({
        from,
        to: animador.email,
        subject: `[Oratorio Cordón] ${titulo}`,
        text: `${mensaje}\n\nPodés ver esta notificación en la sección Notificaciones de la app.`,
      }),
    ),
  );
  return notificaciones;
}

export async function notificarATodos(payload) {
  const animadores = await Animador.find().select("_id");
  return crearNotificaciones({
    ...payload,
    destinatarios: animadores.map((animador) => animador._id),
  });
}
