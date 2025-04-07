const request = require('supertest');
const express = require('express');
const videoController = require('../controllers/videoController');

const app = express();

// Set up a test route for the video controller
app.use('/api/videos', videoController);

describe('Video Controller', () => {
  it('should create a video', async () => {
    const res = await request(app)
      .post('/api/videos')
      .send({ title: 'Test Video', description: 'A test video description' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('video');
  });

  it('should get a video by ID', async () => {
    const videoId = '123'; // Use a valid video ID for the test
    const res = await request(app)
      .get(`/api/videos/${videoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('video');
  });

  it('should return 404 for a non-existent video', async () => {
    const res = await request(app)
      .get('/api/videos/999'); // Non-existent ID

    expect(res.statusCode).toEqual(404);
  });

  it('should update a video', async () => {
    const videoId = '123'; // Use a valid video ID for the test
    const res = await request(app)
      .put(`/api/videos/${videoId}`)
      .send({ title: 'Updated Test Video' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('video');
  });

  it('should delete a video', async () => {
    const videoId = '123'; // Use a valid video ID for the test
    const res = await request(app)
      .delete(`/api/videos/${videoId}`);

    expect(res.statusCode).toEqual(204);
  });
});