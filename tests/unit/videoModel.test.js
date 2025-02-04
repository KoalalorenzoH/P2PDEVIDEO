const mongoose = require('mongoose');
const Video = require('../models/videoModel');

// Sample video data for testing
const sampleVideoData = {
    title: 'Sample Video',
    description: 'This is a sample video description.',
    tags: ['sample', 'video', 'test'],
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('Video Model', () => {
    beforeAll(async () => {
        // Connect to the database
        const mongoUrl = 'mongodb://localhost:27017/test';
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Close the database connection
        await mongoose.connection.close();
    });

    it('should create a video successfully with valid data', async () => {
        const video = new Video(sampleVideoData);
        const savedVideo = await video.save();

        expect(savedVideo._id).toBeDefined();
        expect(savedVideo.title).toBe(sampleVideoData.title);
        expect(savedVideo.description).toBe(sampleVideoData.description);
        expect(savedVideo.tags).toEqual(expect.arrayContaining(sampleVideoData.tags));
    });

    it('should throw validation error if title is missing', async () => {
        const video = new Video({
            description: 'This is a video without a title.',
            tags: ['no title']
        });

        await expect(video.save()).rejects.toThrow();
    });

    it('should throw validation error if tags are not an array', async () => {
        const video = new Video({
            title: 'Invalid Tags Video',
            description: 'This video has invalid tags.',
            tags: 'not an array'
        });

        await expect(video.save()).rejects.toThrow();
    });
});