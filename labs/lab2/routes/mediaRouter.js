const express = require('express');
const multer = require('multer');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const upload = multer({dest: "uploads/"});

/**
 * TODO: Add some comment here
 * @route GET /api/media/{id}
 * @group Media - media operations
 * @param {integer} id.path.required - id of media file - eg: 1
 * @returns {file} 201 - media
 * @returns {Error} 404 - media not found
 */
router.get('/:id', mediaController.getMediaById);

/**
 * To add new media
 * @route POST /api/media
 * @group Media - media operations
 * @consumes multipart/form-data
 * @param {file} media.formData.required - media file
 * @returns {integer} 201 - media
 * @returns {Error} 400 - media not correct
 */
router.post('/', upload.single("media"), mediaController.addMedia);


module.exports = router;