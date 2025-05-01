// videoUploadRoutes.js

const express = require('express');
const videoUploadController = require('../controllers/videoUploadController');

const router = express.Router();

/**
 * @route POST /api/videos/upload
 * @desc Upload a video
 * @access Public (or specify authentication middleware if needed)
 */
router.post('/upload', videoUploadController.uploadVideo);

/**
 * @route GET /api/videos/:id
 * @desc Get video details by ID
 * @access Public (or specify authentication middleware if needed)
 */
router.get('/:id', videoUploadController.getVideoDetails);

module.exports = router;