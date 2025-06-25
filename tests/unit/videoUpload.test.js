const request = require('supertest');
const app = require('../../src/app'); // Assuming app is exported from this file
const videoUploadController = require('../../src/controllers/videoUploadController');

describe('Video Upload API', () => {
    beforeEach(() => {
        // Reset any necessary data or mocks before each test
    });

    test('should upload a video successfully', async () => {
        const response = await request(app)
            .post('/api/video/upload') // Change the endpoint as necessary
            .attach('videoFile', 'path/to/video.mp4') // Provide a valid path to a test video
            .set('Authorization', 'Bearer token'); // Add auth if needed

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
        expect(response.body).toHaveProperty('videoId'); // Assuming a videoId is returned
    });

    test('should return error for invalid video format', async () => {
        const response = await request(app)
            .post('/api/video/upload')
            .attach('videoFile', 'path/to/invalid.txt') // Invalid file type
            .set('Authorization', 'Bearer token');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid video format');
    });

    test('should return error if no file is provided', async () => {
        const response = await request(app)
            .post('/api/video/upload')
            .set('Authorization', 'Bearer token');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'No video file provided');
    });

    test('should return error for unauthorized access', async () => {
        const response = await request(app)
            .post('/api/video/upload')
            .attach('videoFile', 'path/to/video.mp4'); // Missing auth token

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Unauthorized access');
    });
});
