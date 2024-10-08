// routes/users.js
const express = require('express');
const router = express.Router();
const fileTransform= require("../controllers/uploadController")
const multer = require('multer');
const path = require('path');
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Example route to create a new user
router.post('/upload_rate_excel',upload.single('file'), fileTransform.uploadFileToTransform);
router.get('/get_all_transform_record', fileTransform.getAllTransformRecord);
router.get('/single_premium_record', fileTransform.singlePremiumRecord);
router.get('/get_grid_record', fileTransform.getGridRecord);

module.exports = router;
