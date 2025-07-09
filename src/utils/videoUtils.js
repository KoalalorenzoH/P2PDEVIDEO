/**
 * videoUtils.js
 * Utility functions for video processing.
 * This module contains various helper functions to handle video-related tasks,
 * such as formatting, encoding, and metadata extraction.
 *
 * @module videoUtils
 */

/**
 * Formats the video duration from seconds to a human-readable format.
 *
 * @param {number} seconds - The duration in seconds.
 * @returns {string} The formatted duration (e.g., "02:30:15").
 */
function formatDuration(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        throw new Error('Invalid duration provided.');
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Extracts metadata from a video file.
 *
 * @param {File} videoFile - The video file to extract metadata from.
 * @returns {Promise<object>} A promise that resolves to an object containing metadata.
 */
function extractMetadata(videoFile) {
    return new Promise((resolve, reject) => {
        // Simulated metadata extraction logic (placeholder)
        if (!videoFile) {
            return reject(new Error('No video file provided.'));
        }
        const metadata = {
            title: 'Sample Video',
            duration: 120,
            format: videoFile.type,
            size: videoFile.size,
        };
        resolve(metadata);
    });
}

/**
 * Validates the video file based on size and format.
 *
 * @param {File} videoFile - The video file to validate.
 * @returns {boolean} True if the file is valid, false otherwise.
 */
function validateVideoFile(videoFile) {
    const allowedFormats = ['video/mp4', 'video/webm', 'video/ogg'];
    const maxSize = 200 * 1024 * 1024; // 200MB
    if (!allowedFormats.includes(videoFile.type)) {
        throw new Error('Invalid video format.');
    }
    if (videoFile.size > maxSize) {
        throw new Error('Video file exceeds maximum size of 200MB.');
    }
    return true;
}

module.exports = {
    formatDuration,
    extractMetadata,
    validateVideoFile,
};