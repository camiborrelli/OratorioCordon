const express = require("express");
const cors = require("cors");

const app = express();

// Configure CORS using ALLOWED_ORIGINS env (comma-separated)
const rawAllowed = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = rawAllowed
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Normalization middleware: fix duplicated hostname segments and optional /v1 prefix
app.use((req, res, next) => {
  try {
    const url = req.url || "";
    const marker = ".vercel.app";
    if (url.indexOf(marker) !== -1) {
      const last = url.lastIndexOf(marker);
      const after = url.substring(last + marker.length);
      if (after && after.startsWith("/")) {
        req.url = after;
      }
    }

    if (req.url.startsWith("/v1/")) {
      req.url = req.url.replace(/^\/v1/, "");
    } else if (req.url === "/v1") {
      req.url = "/";
    }
  } catch (e) {
    // don't block requests on normalization errors
  }
  return next();
});

// Debug logging for problematic endpoints — temporary
app.use((req, res, next) => {
  try {
    const path = req.originalUrl || req.url;
    if (path && path.includes("/animador/login")) {
      console.log(
        "[DEBUG] v1/app.js request =>",
        req.method,
        path,
        "headers:",
        JSON.stringify(req.headers || {}),
      );
    }
  } catch (e) {}
  return next();
});

// Example auth middleware applied to protected routes
const authModule = require("./middlewares/auth");
const errorHandlerModule = require("./middlewares/errorHandler");
const auth = authModule && authModule.default ? authModule.default : authModule;
const errorHandler =
  errorHandlerModule && errorHandlerModule.default
    ? errorHandlerModule.default
    : errorHandlerModule;

// routes are ESM modules exporting default router when imported via require
app.use("/ninio", require("../routes/ninio.routes").default);
app.use("/animador", require("../routes/animador.routes").default);
app.use("/division", require("../routes/division.routes").default);
app.use("/evento", require("../routes/evento.routes").default);
app.use("/recorrida", require("../routes/recorrida.routes").default);
app.use("/asistencia", require("../routes/asistencia.routes").default);
app.use("/reunion", require("../routes/reunion.routes").default);

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (must be after routes)
app.use(errorHandler);

module.exports = app;
