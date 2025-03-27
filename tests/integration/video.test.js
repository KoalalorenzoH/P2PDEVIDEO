const request = require('supertest');
const app = require('../../src/app');

describe('Video Management Integration Tests', () => {
    // Test for video upload functionality
    it('should upload a video successfully', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .attach('video', 'path/to/video.mp4') // Update this path according to your test environment
            .expect(201);

        expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
        expect(response.body).toHaveProperty('videoId');
    });

    // Test for fetching video metadata
    it('should fetch video metadata successfully', async () => {
        const videoId = 'example-video-id'; // Use a valid video ID from your database

        const response = await request(app)
            .get(`/api/videos/${videoId}`)
            .expect(200);

        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('url');
    });

    // Test for deleting a video
    it('should delete a video successfully', async () => {
        const videoId = 'example-video-id'; // Use a valid video ID from your database

        const response = await request(app)
            .delete(`/api/videos/${videoId}`)
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Video deleted successfully');
    });

    // Test for handling non-existent video
    it('should return 404 for non-existent video', async () => {
        const videoId = 'non-existent-video-id';

        const response = await request(app)
            .get(`/api/videos/${videoId}`)
            .expect(404);

        expect(response.body).toHaveProperty('error', 'Video not found');
    });
});
