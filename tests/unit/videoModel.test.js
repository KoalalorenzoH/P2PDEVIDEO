const mongoose = require('mongoose');
const Video = require('../models/videoModel');

// Test data for video schema
const validVideoData = {
    title: 'Test Video',
    description: 'A description for the test video',
    url: 'https://example.com/test-video',
    uploadedBy: new mongoose.Types.ObjectId(),
    tags: ['test', 'video']
};

describe('Video Model', () => {
    it('should create a video with valid data', async () => {
        const video = new Video(validVideoData);
        const savedVideo = await video.save();
        expect(savedVideo._id).toBeDefined();
        expect(savedVideo.title).toBe(validVideoData.title);
        expect(savedVideo.description).toBe(validVideoData.description);
        expect(savedVideo.url).toBe(validVideoData.url);
        expect(savedVideo.uploadedBy).toEqual(validVideoData.uploadedBy);
        expect(savedVideo.tags).toEqual(expect.arrayContaining(validVideoData.tags));
    });

    it('should not create a video without a title', async () => {
        const video = new Video({...validVideoData, title: ''});
        let error;
        try {
            await video.save();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.errors.title).toBeDefined();
    });

    it('should not create a video without a URL', async () => {
        const video = new Video({...validVideoData, url: ''});
        let error;
        try {
            await video.save();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.errors.url).toBeDefined();
    });

    it('should not create a video with invalid URL', async () => {
        const video = new Video({...validVideoData, url: 'invalid-url'});
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
