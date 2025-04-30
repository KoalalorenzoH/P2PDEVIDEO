/**
 * videoProcessor.js
 * 
 * Utility functions for processing video uploads.
 * This module includes functionality to validate video files, generate unique filenames, and perform any required preprocessing.
 * 
 * @module videoProcessor
 */

const path = require('path');
const fs = require('fs');

/**
 * Validates the video file type and size.
 * 
 * @param {Object} file - The video file object.
 * @param {Array} allowedTypes - Array of allowed MIME types.
 * @param {number} maxSize - Maximum allowed file size in bytes.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validateVideoFile(file, allowedTypes, maxSize) {
    const fileType = file.mimetype;
    const fileSize = file.size;

    // Check MIME type
    if (!allowedTypes.includes(fileType)) {
        console.error(`Invalid file type: ${fileType}`);
        return false;
    }

    // Check file size
    if (fileSize > maxSize) {
        console.error(`File size exceeds limit: ${fileSize} bytes`);
        return false;
    }

    return true;
}

/**
 * Generates a unique filename for the uploaded video.
 * 
 * @param {string} originalName - The original name of the file.
 * @returns {string} - Returns a unique filename.
 */
function generateUniqueFilename(originalName) {
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return `${baseName}-${uniqueSuffix}${ext}`;
}

/**
 * Saves the video file to the specified directory.
 * 
 * @param {Object} file - The video file object.
 * @param {string} directory - The destination directory.
 * @returns {Promise<string>} - Promise resolving to the path of the saved file.
 */
function saveVideoFile(file, directory) {
    return new Promise((resolve, reject) => {
        const uniqueName = generateUniqueFilename(file.originalname);
        const filePath = path.join(directory, uniqueName);

        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error(`Error saving file: ${err}`);
                return reject(err);
            }
            resolve(filePath);
        });
    });
}

module.exports = {
    validateVideoFile,
    generateUniqueFilename,
    saveVideoFile
};
