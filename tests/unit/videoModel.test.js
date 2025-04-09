const mongoose = require('mongoose');
const Video = require('../models/video');

/**
 * Unit tests for the Video model schema.
 */
describe('Video Model', () => {
    beforeAll(async () => {
        // Connect to the in-memory database
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect from the database
        await mongoose.connection.close();
    });

    it('should create a valid video schema', async () => {
        const videoData = {
            title: 'Sample Video',
            description: 'This is a sample video.',
            url: 'http://example.com/sample-video',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const video = new Video(videoData);
        const savedVideo = await video.save();

        expect(savedVideo._id).toBeDefined();
        expect(savedVideo.title).toBe(videoData.title);
        expect(savedVideo.description).toBe(videoData.description);
        expect(savedVideo.url).toBe(videoData.url);
        expect(savedVideo.createdAt).toEqual(videoData.createdAt);
        expect(savedVideo.updatedAt).toEqual(videoData.updatedAt);
    });

    it('should throw an error if title is missing', async () => {
        const videoData = {
            description: 'This is a sample video.',
            url: 'http://example.com/sample-video',
            createdAt: new Date(),
            updatedAt: new Date()
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

    it('should throw an error if url is invalid', async () => {
        const videoData = {
            title: 'Sample Video',
            description: 'This is a sample video.',
            url: 'invalid-url',
            createdAt: new Date(),
            updatedAt: new Date()
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