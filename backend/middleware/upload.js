import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_MIME = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export const generateFilename = (mimetype) => {
  const ext = EXT_BY_MIME[mimetype] || ".jpg";
  const unique = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${unique}${ext}`;
};

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(new Error("Only JPEG, PNG, WEBP, and GIF images are allowed"));
    return;
  }
  cb(null, true);
};

// Memory storage: the file arrives as a buffer (req.file.buffer) so the
// route handler can send it straight to Supabase Storage, with no
// dependency on a writable/persistent local disk in production. The route
// falls back to writing that buffer to backend/uploads/ when Supabase
// Storage isn't configured (local dev).
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
