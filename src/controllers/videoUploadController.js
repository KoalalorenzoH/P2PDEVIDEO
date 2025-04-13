// videoUploadController.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadVideo, processVideo } = require('../utils/videoUtils');

// Set up storage engine for video uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @route POST /api/videos/upload
 * @description Handle video uploads
 * @access Public
 */
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        // Check if a video file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Call utility function to upload video
        const videoUrl = await uploadVideo(req.file);

        // Process video if needed
        await processVideo(videoUrl);

        return res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({ message: 'Error uploading video', error: error.message });
    }
});

module.exports = router;