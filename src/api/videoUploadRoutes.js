const express = require('express');
const videoUploadController = require('../controllers/videoUploadController');

const router = express.Router();

/**
 * @route POST /api/videos/upload
 * @desc Upload a video
 * @access Public
 */
router.post('/upload', videoUploadController.uploadVideo);

/**
 * @route GET /api/videos/:id
 * @desc Get video by ID
 * @access Public
 */
router.get('/:id', videoUploadController.getVideoById);

/**
 * @route DELETE /api/videos/:id
 * @desc Delete a video by ID
 * @access Public
 */
router.delete('/:id', videoUploadController.deleteVideo);

module.exports = router;