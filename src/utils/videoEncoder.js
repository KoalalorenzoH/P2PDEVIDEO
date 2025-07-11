/**
 * videoEncoder.js
 *
 * This module contains functions for encoding videos.
 * It provides a simple interface to encode video files using a specified codec.
 *
 * Author: P2PDEVIDEO Team
 * Date: 2023-10-04
 */

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

/**
 * Encodes a video file to a specified format.
 *
 * @param {string} inputPath - The path to the input video file.
 * @param {string} outputFormat - The desired output video format (e.g., 'mp4', 'webm').
 * @param {string} outputDir - The directory to save the encoded video.
 * @returns {Promise<string>} - The path to the encoded video file.
 * @throws {Error} - Throws an error if encoding fails.
 */
async function encodeVideo(inputPath, outputFormat, outputDir) {
    return new Promise((resolve, reject) => {
        const outputFileName = `encoded_${path.basename(inputPath, path.extname(inputPath))}.${outputFormat}`;
        const outputPath = path.join(outputDir, outputFileName);

        ffmpeg(inputPath)
            .toFormat(outputFormat)
            .on('end', () => {
                console.log(`Encoding finished: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`Error encoding video: ${err.message}`);
                reject(new Error(`Encoding failed: ${err.message}`));
            })
            .save(outputPath);
    });
}

module.exports = {
    encodeVideo,
};