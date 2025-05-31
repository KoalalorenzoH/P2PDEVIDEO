const videoEncoder = require('../../utils/videoEncoder');

describe('Video Encoder Utility Tests', () => {
    it('should encode video correctly', () => {
        const inputVideoPath = 'path/to/input/video.mp4';
        const expectedOutputPath = 'path/to/output/video_encoded.mp4';

        const result = videoEncoder.encode(inputVideoPath, expectedOutputPath);
        expect(result).toBe(true);
    });

    it('should throw an error if input path is invalid', () => {
        const invalidVideoPath = 'invalid/path/video.mp4';
        const expectedOutputPath = 'path/to/output/video_encoded.mp4';

        expect(() => videoEncoder.encode(invalidVideoPath, expectedOutputPath)).toThrow('Invalid input path');
    });

    it('should throw an error if output path is invalid', () => {
        const inputVideoPath = 'path/to/input/video.mp4';
        const invalidOutputPath = 'invalid/path/video_encoded.mp4';

        expect(() => videoEncoder.encode(inputVideoPath, invalidOutputPath)).toThrow('Invalid output path');
    });

    it('should support multiple encoding formats', () => {
        const inputVideoPath = 'path/to/input/video.mp4';
        const outputFormats = ['mp4', 'avi', 'mov'];

        outputFormats.forEach(format => {
            const expectedOutputPath = `path/to/output/video_encoded.${format}`;
            const result = videoEncoder.encode(inputVideoPath, expectedOutputPath);
            expect(result).toBe(true);
        });
    });
});