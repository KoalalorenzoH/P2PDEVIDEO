const request = require('supertest');
const app = require('../../src/app'); // Assuming the app is exported from this file
const Video = require('../../src/models/videoModel'); // Import the video model
const { connectDB, disconnectDB } = require('../../src/utils/db'); // Database connection utilities

// Connect to the database before running the tests
beforeAll(async () => {
    await connectDB();
});

// Clear the database after each test
afterEach(async () => {
    await Video.deleteMany({});
});

// Disconnect the database after all tests
afterAll(async () => {
    await disconnectDB();
});

describe('Video Upload Integration Tests', () => {
    it('should upload a video successfully', async () => {
        const videoData = {
            title: 'Test Video',
            description: 'A test video description',
            file: 'path/to/video.mp4', // Placeholder, adjust as necessary
        };

        const response = await request(app)
            .post('/api/videos/upload') // Assuming this is the correct endpoint
            .send(videoData)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
        expect(response.body).toHaveProperty('videoId');
    });

    it('should return an error for missing video data', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .send({})
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Video data is required');
    });

    it('should return an error for invalid video format', async () => {
        const videoData = {
            title: 'Test Video',
            description: 'A test video description',
            file: 'path/to/invalid-format.txt', // Invalid format
        };

        const response = await request(app)
            .post('/api/videos/upload')
            .send(videoData)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid video format');
    });
});