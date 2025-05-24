const request = require('supertest');
const app = require('../../src/app'); // Adjust the path to your main app file

describe('Video Upload Integration Tests', () => {
    it('should upload a video successfully', async () => {
        const res = await request(app)
            .post('/api/videos/upload') // Adjust the endpoint based on your routes
            .attach('video', 'path/to/video.mp4') // Replace with a valid video path
            .set('Authorization', `Bearer ${yourToken}`) // Include authentication token if needed
            .expect(200);

        expect(res.body).toHaveProperty('message', 'Video uploaded successfully');
        expect(res.body).toHaveProperty('videoId');
    });

    it('should return an error for invalid video format', async () => {
        const res = await request(app)
            .post('/api/videos/upload')
            .attach('video', 'path/to/invalid.txt') // Invalid format
            .set('Authorization', `Bearer ${yourToken}`)
            .expect(400);

        expect(res.body).toHaveProperty('error', 'Invalid file format');
    });

    it('should return an error if no video is provided', async () => {
        const res = await request(app)
            .post('/api/videos/upload')
            .set('Authorization', `Bearer ${yourToken}`)
            .expect(400);

        expect(res.body).toHaveProperty('error', 'No video file provided');
    });
});