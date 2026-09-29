import express from 'express';
import { upload, processUploadedFile, processUploadedFiles } from '../middlewares/upload.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/single', protect, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileUrl = await processUploadedFile(req.file);
    res.status(200).json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/multiple', protect, upload.array('files', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const urls = await processUploadedFiles(req.files);
    res.status(200).json({
      success: true,
      data: {
        urls
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
