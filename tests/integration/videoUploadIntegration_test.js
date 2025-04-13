const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from app.js

describe('Video Upload Integration Tests', () => {
    it('should upload a video successfully', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .attach('video', 'path/to/test/video.mp4') // Path to a test video file
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
        expect(response.body).toHaveProperty('videoId'); // Assuming the response includes the video ID
    });

    it('should return an error for an invalid video format', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .attach('video', 'path/to/test/invalid.txt') // Invalid format
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Invalid video format');
    });

    it('should return an error for missing video file', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .expect(400);

        expect(response.body).toHaveProperty('error', 'No video file uploaded');
    });

    // Add more tests as needed to cover other scenarios
});
