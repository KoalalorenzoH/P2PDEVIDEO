const mongoose = require('mongoose');
const Video = require('../models/videoModel'); // Import the Video model

// Connect to the MongoDB in-memory database before tests
beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test'; // Change to in-memory db connection
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear the database after each test
afterEach(async () => {
    await Video.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

// Test suite for Video model schema
describe('Video Model', () => {
    it('should create a video successfully with valid data', async () => {
        const videoData = {
            title: 'Sample Video',
            description: 'This is a sample video for testing',
            url: 'http://example.com/sample.mp4',
            uploadDate: new Date(),
            userId: mongoose.Types.ObjectId()
        };

        const video = new Video(videoData);
        const savedVideo = await video.save();

        expect(savedVideo._id).toBeDefined();
        expect(savedVideo.title).toBe(videoData.title);
        expect(savedVideo.description).toBe(videoData.description);
    });

    it('should throw an error if title is missing', async () => {
        const videoData = {
            description: 'This is a sample video for testing',
            url: 'http://example.com/sample.mp4',
            uploadDate: new Date(),
            userId: mongoose.Types.ObjectId()
        };

        const video = new Video(videoData);
        let error;

        try {
            await video.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.title).toBeDefined();
    });

    it('should throw an error if URL is invalid', async () => {
        const videoData = {
            title: 'Invalid Video',
            description: 'This video has an invalid URL',
            url: 'invalid-url', // Invalid URL
            uploadDate: new Date(),
            userId: mongoose.Types.ObjectId()
        };

        const video = new Video(videoData);
        let error;

        try {
            await video.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.url).toBeDefined();
    });
});