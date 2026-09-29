import type { CorsOptions } from "cors";

const DEFAULT_ORIGINS = ["http://localhost:5173"];

const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const origins = allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ORIGINS;

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (origins.includes("*") || origins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS blocked request from origin: ${origin}`);
    return callback(null, false);
  },
};

export { corsOptions };
