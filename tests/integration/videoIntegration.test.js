const request = require('supertest');
const app = require('../../src/app'); // Adjust the path according to your setup
const mongoose = require('mongoose');

describe('Video Integration Tests', () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await mongoose.connect(process.env.MONGODB_URI, { // Ensure MONGODB_URI is set in your environment variables
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after tests
    await mongoose.connection.close();
  });

  test('POST /api/videos - Create a new video', async () => {
    const videoData = {
      title: 'Test Video',
      description: 'This is a test video description',
      // Add other fields as necessary for your video schema
    };

    const response = await request(app)
      .post('/api/videos')
      .send(videoData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Video created successfully');
    expect(response.body).toHaveProperty('video');
  });

  test('GET /api/videos/:id - Get video by ID', async () => {
    const videoId = 'some-valid-video-id'; // Replace with a valid video ID from your database

    const response = await request(app)
      .get(`/api/videos/${videoId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('video');
    expect(response.body.video).toHaveProperty('title');
  });

  test('PUT /api/videos/:id - Update video', async () => {
    const videoId = 'some-valid-video-id'; // Replace with a valid video ID from your database
    const updateData = {
      title: 'Updated Test Video',
    };

    const response = await request(app)
      .put(`/api/videos/${videoId}`)
      .send(updateData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Video updated successfully');
  });

  test('DELETE /api/videos/:id - Delete video', async () => {
    const videoId = 'some-valid-video-id'; // Replace with a valid video ID from your database

    const response = await request(app)
      .delete(`/api/videos/${videoId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Video deleted successfully');
  });
});
