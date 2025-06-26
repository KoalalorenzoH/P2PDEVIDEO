const mongoose = require('mongoose');
const Video = require('../models/video'); // Import the Video model

beforeAll(async () => {
    // Set up the connection to the test database
    await mongoose.connect('mongodb://localhost:27017/p2pdevideo_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Close the connection after tests are completed
    await mongoose.connection.close();
});

describe('Video Model Test', () => {
    it('should create a video successfully', async () => {
        const videoData = {
            title: 'Test Video',
            description: 'This is a test video',
            url: 'http://example.com/video.mp4',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const video = new Video(videoData);
        const savedVideo = await video.save();
        expect(savedVideo._id).toBeDefined();
        expect(savedVideo.title).toBe(videoData.title);
    });

    it('should not create a video without a title', async () => {
        const videoData = {
            description: 'This is a test video',
            url: 'http://example.com/video.mp4',
            createdAt: new Date(),
            updatedAt: new Date(),
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

    it('should retrieve a video by ID', async () => {
        const videoData = {
            title: 'Test Video 2',
            description: 'This is another test video',
            url: 'http://example.com/video2.mp4',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const video = new Video(videoData);
        const savedVideo = await video.save();
        const foundVideo = await Video.findById(savedVideo._id);
        expect(foundVideo.title).toBe(videoData.title);
    });

    it('should delete a video successfully', async () => {
        const videoData = {
            title: 'Test Video 3',
            description: 'This is a third test video',
            url: 'http://example.com/video3.mp4',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const video = new Video(videoData);
        const savedVideo = await video.save();
        await Video.deleteOne({ _id: savedVideo._id });
        const deletedVideo = await Video.findById(savedVideo._id);
        expect(deletedVideo).toBeNull();
    });
});