/**
 * videoEncoder.js
<<<<<<< HEAD
 * 
 * This module provides functions for encoding videos.
 * It utilizes various encoding techniques and optimizations to ensure efficient video processing.
 * 
 * @module videoEncoder
 * @example
 * 
 * const { encodeVideo } = require('./videoEncoder');
 * encodeVideo('input.mp4', 'output.mp4');
 */

const { exec } = require('child_process');
const path = require('path');

/**
 * Encodes a video file using FFmpeg.
 * 
 * @function encodeVideo
 * @param {string} inputPath - The path to the input video file.
 * @param {string} outputPath - The path where the encoded video will be saved.
 * @param {string} [codec='libx264'] - The codec to use for encoding. Defaults to 'libx264'.
 * @returns {Promise<string>} - A promise that resolves with the output path upon successful encoding.
 * @throws {Error} - Throws an error if encoding fails.
 */
const encodeVideo = (inputPath, outputPath, codec = 'libx264') => {
    return new Promise((resolve, reject) => {
        const inputFullPath = path.resolve(inputPath);
        const outputFullPath = path.resolve(outputPath);

        const command = `ffmpeg -i ${inputFullPath} -c:v ${codec} ${outputFullPath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Encoding failed: ${stderr || stdout}`));
            } else {
                resolve(outputFullPath);
            }
        });
    });
};

module.exports = { encodeVideo };
=======
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
>>>>>>> ff0060b1e5e6f1befd22addf8d29d3eaa5767899
