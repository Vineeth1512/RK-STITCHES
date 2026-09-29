import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { cloudinary, isConfigured } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp|gif/;
  const allowedVideoTypes = /mp4|webm|mov|mkv/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mimetype = file.mimetype;

  const isImage = allowedImageTypes.test(ext) || mimetype.startsWith('image/');
  const isVideo = allowedVideoTypes.test(ext) || mimetype.startsWith('video/');

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only image and video files are supported.'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max for videos/photos
  },
  fileFilter
});

/**
 * Upload single file from local disk to Cloudinary (if configured) or return static URL
 */
export const processUploadedFile = async (file) => {
  if (!file) return null;

  if (isConfigured) {
    try {
      const isVideo = file.mimetype.startsWith('video/');
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: isVideo ? 'video' : 'image',
        folder: 'rk_stitches'
      });
      // Remove temporary file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return result.secure_url;
    } catch (error) {
      console.warn('[Upload] Cloudinary upload error, using local path:', error.message);
      return `/uploads/${file.filename}`;
    }
  }

  // Fallback to local server static path
  return `/uploads/${file.filename}`;
};

/**
 * Upload multiple files helper
 */
export const processUploadedFiles = async (files) => {
  if (!files || !Array.isArray(files)) return [];
  const results = [];
  for (const file of files) {
    const url = await processUploadedFile(file);
    if (url) results.push(url);
  }
  return results;
};
