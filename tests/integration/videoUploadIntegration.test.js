const request = require('supertest');
const app = require('../../src/app'); // Assuming app is exported from your main file
const Video = require('../../src/models/video');
const { setupDatabase, teardownDatabase } = require('../setup'); // A file to set up and teardown your test database

// Setup and teardown for tests
beforeAll(setupDatabase);
afterAll(teardownDatabase);

describe('Video Upload Integration Tests', () => {
    let videoData;

    beforeEach(() => {
        // Mock video data for uploading
        videoData = {
            title: 'Sample Video',
            description: 'This is a sample video for testing.',
            videoFile: 'sample_video.mp4', // Mock video file name
            userId: 'user123' // Mock user ID
        };
    });

    it('should upload video successfully', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .send(videoData)
            .expect(201);

        expect(response.body).toHaveProperty('video');
        expect(response.body.video).toHaveProperty('title', videoData.title);
        expect(response.body.video).toHaveProperty('description', videoData.description);
    });

    it('should return error for missing video file', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .send({ title: videoData.title, description: videoData.description, userId: videoData.userId })
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Video file is required.');
    });

    it('should return error for invalid video format', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .attach('videoFile', 'path/to/invalid_format.txt') // Use a text file instead of video
            .send({ title: videoData.title, description: videoData.description, userId: videoData.userId })
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Invalid video format.');
    });
});