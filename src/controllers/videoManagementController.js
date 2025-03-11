// videoManagementController.js

const Video = require('../models/video'); // Assuming video.js is the model for video operations

/**
 * Controller for managing video uploads and operations.
 */
class VideoManagementController {
  /**
   * Handles video upload.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async uploadVideo(req, res) {
    try {
      const { title, description, videoFile } = req.body;
      // Validate input
      if (!title || !videoFile) {
        return res.status(400).json({ message: 'Title and video file are required.' });
      }
      // Create video entry in the database
      const newVideo = new Video({ title, description, videoFile });
      await newVideo.save();
      return res.status(201).json({ message: 'Video uploaded successfully!', data: newVideo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  /**
   * Retrieves a list of all videos.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllVideos(req, res) {
    try {
      const videos = await Video.find();
      return res.status(200).json({ data: videos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  /**
   * Retrieves a specific video by ID.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getVideoById(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found.' });
      }
      return res.status(200).json({ data: video });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  /**
   * Deletes a specific video by ID.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteVideo(req, res) {
    try {
      const { id } = req.params;
      const deletedVideo = await Video.findByIdAndDelete(id);
      if (!deletedVideo) {
        return res.status(404).json({ message: 'Video not found.' });
      }
      return res.status(200).json({ message: 'Video deleted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
}

module.exports = new VideoManagementController();
