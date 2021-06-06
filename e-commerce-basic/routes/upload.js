const router = require('express').Router();
const cloud = require('cloudinary');
const fs = require('fs');
const authMiddle = require('../middleware/auth.middle');
const authAdmin = require('../middleware/auth.admin');

// we will upload image on cloudinary
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Upload image
router.post('/upload', authMiddle, authAdmin, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    const file = req.files.file;
    if (file.size > 2 * 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large." });
    }
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    await cloud.v2.uploader.upload(file.tempFilePath, {folder: 'test'}, async (err, result) => {
      if (err) throw err;
      removeTmp(file.tempFilePath);

      res.json({ public_id: result.public_id, url: result.secure_url });
    });
  } catch (error) {
    removeTmp(file.tempFilePath);
    return res.status(500).json({ msg: error.message });
  }
});

router.post('/destroy', authMiddle, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected." });

    cloud.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) throw error;

      res.json({ msg: "Deleted a picture." })
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, error => {
    if (error) throw error;
  });
}

module.exports = router;