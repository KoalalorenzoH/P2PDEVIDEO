// videoController.js

const Video = require('../models/video'); // Import the Video model

/**
 * @description Creates a new video entry in the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createVideo = async (req, res) => {
    try {
        const { title, description, filePath } = req.body;
        const video = new Video({ title, description, filePath });
        await video.save();
        res.status(201).json({ message: 'Video created successfully', video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create video', error: error.message });
    }
};

/**
 * @description Retrieves all videos from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve videos', error: error.message });
    }
};

/**
 * @description Retrieves a video by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getVideoById = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve video', error: error.message });
    }
};

/**
 * @description Updates a video by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video updated successfully', updatedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update video', error: error.message });
    }
};

/**
 * @description Deletes a video by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVideo = await Video.findByIdAndDelete(id);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete video', error: error.message });
    }
};

module.exports = { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };