const request = require('supertest');
const app = require('../../app'); // Adjust the path as necessary
const VideoController = require('../controllers/videoController');

describe('Video Controller', () => {
  describe('GET /videos', () => {
    it('should return a list of videos', async () => {
      const res = await request(app).get('/api/videos');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('videos');
      expect(Array.isArray(res.body.videos)).toBeTruthy();
    });
  });

  describe('POST /videos', () => {
    it('should create a new video', async () => {
      const videoData = {
        title: 'Test Video',
        description: 'This is a test video.',
        url: 'http://example.com/video.mp4',
        tags: ['test', 'video'],
      };

      const res = await request(app).post('/api/videos').send(videoData);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('video');
      expect(res.body.video.title).toEqual(videoData.title);
    });
  });

  describe('GET /videos/:id', () => {
    it('should return a video by id', async () => {
      const res = await request(app).get('/api/videos/1'); // Assuming video with id 1 exists
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('video');
      expect(res.body.video.id).toEqual(1);
    });
  });

  describe('DELETE /videos/:id', () => {
    it('should delete a video by id', async () => {
      const res = await request(app).delete('/api/videos/1'); // Assuming video with id 1 exists
      expect(res.statusCode).toEqual(204);
    });
  });
});
