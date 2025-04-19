// videoManagementController.js

const Video = require('../models/videoModel');

/**
 * Controller for managing video operations.
 */
class VideoManagementController {
    /**
     * Upload a new video.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async uploadVideo(req, res) {
        try {
            const { title, description, videoFile } = req.body;
            const newVideo = new Video({ title, description, videoFile });
            await newVideo.save();
            res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading video', error: error.message });
        }
    }

    /**
     * Get a video by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async getVideoById(req, res) {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }
            res.status(200).json(video);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching video', error: error.message });
        }
    }

    /**
     * Delete a video by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async deleteVideo(req, res) {
        try {
            const video = await Video.findByIdAndDelete(req.params.id);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }
            res.status(200).json({ message: 'Video deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting video', error: error.message });
        }
    }
}

module.exports = VideoManagementController;