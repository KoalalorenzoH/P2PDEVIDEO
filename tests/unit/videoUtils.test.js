const { encodeVideo, decodeVideo } = require('../utils/videoUtils');

describe('Video Utility Functions', () => {
    test('encodeVideo should return a base64 encoded string', () => {
        const input = 'sample video data';
        const result = encodeVideo(input);
        expect(result).toMatch(/^data:video\/.*;base64,/);
        expect(result).toContain(Buffer.from(input).toString('base64'));
    });

    test('decodeVideo should return the original data from a base64 string', () => {
        const input = 'sample video data';
        const encoded = encodeVideo(input);
        const decoded = decodeVideo(encoded);
        expect(decoded).toBe(input);
    });

    test('decodeVideo should throw an error for invalid base64 string', () => {
        const invalidInput = 'invalid base64';
        expect(() => decodeVideo(invalidInput)).toThrowError('Invalid base64 string');
    });

    test('encodeVideo should handle empty input gracefully', () => {
        const result = encodeVideo('');
        expect(result).toMatch(/^data:video\/.*;base64,/);
    });

    test('decodeVideo should return empty string for empty base64 string', () => {
        const decoded = decodeVideo('data:video/mp4;base64,');
        expect(decoded).toBe('');
    });
});
