const request = require('supertest');
const app = require('../../src/app'); // Assuming your express app is exported from src/app.js

describe('Video Upload Integration Tests', () => {
  let videoData;

  beforeAll(() => {
    // Setup test video data
    videoData = {
      title: 'Test Video',
      description: 'This is a test video for integration testing.',
      filePath: '/path/to/video.mp4', // Mock file path or data
    };
  });

  test('should upload a video successfully', async () => {
    const response = await request(app)
      .post('/api/videos/upload') // Adjust endpoint as necessary
      .send(videoData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
    expect(response.body).toHaveProperty('videoId'); // Assuming the response returns a video ID
  });

  test('should fail to upload a video with missing fields', async () => {
    const response = await request(app)
      .post('/api/videos/upload')
      .send({}); // Sending empty data

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Validation error');
  });

  test('should fail to upload a video with invalid data', async () => {
    const response = await request(app)
      .post('/api/videos/upload')
      .send({
        title: '', // Invalid title
        description: 'This video has no title',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Title is required');
  });

  // Additional tests for other scenarios can be added here
});