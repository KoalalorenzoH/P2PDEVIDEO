const request = require('supertest');
const express = require('express');
const videoController = require('../controllers/videoController');
const app = express();

// Set up the express app to use the video controller routes
app.use(express.json());
app.use('/videos', videoController);

describe('Video Controller Tests', () => {
  // Test case for creating a video
  it('should create a new video', async () => {
    const videoData = { title: 'Test Video', description: 'This is a test video.', url: 'http://example.com/video.mp4' };
    const response = await request(app).post('/videos').send(videoData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(videoData.title);
  });

  // Test case for fetching all videos
  it('should fetch all videos', async () => {
    const response = await request(app).get('/videos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test case for fetching a specific video by ID
  it('should fetch a video by ID', async () => {
    const videoId = '1'; // Replace with a valid ID from your database
    const response = await request(app).get(`/videos/${videoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', videoId);
  });

  // Test case for updating a video
  it('should update a video', async () => {
    const videoId = '1'; // Replace with a valid ID from your database
    const updatedData = { title: 'Updated Video Title' };
    const response = await request(app).put(`/videos/${videoId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
  });

  // Test case for deleting a video
  it('should delete a video', async () => {
    const videoId = '1'; // Replace with a valid ID from your database
    const response = await request(app).delete(`/videos/${videoId}`);
    expect(response.status).toBe(204);
  });
});