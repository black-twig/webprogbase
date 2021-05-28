const express = require('express');
const multer = require('multer');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const upload = multer({dest: "uploads/"});

router.get('/:id', mediaController.getMediaById);

router.post('/', upload.single("media"), mediaController.addMedia);


module.exports = router;