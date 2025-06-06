/**
 * videoEncoder.js
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