const request = require('supertest');
const app = require('../../src/app'); // Adjust the path to your app file
const mongoose = require('mongoose');

describe('Video Management Integration Tests', () => {
  // Connect to the database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Close the database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new video', async () => {
    const response = await request(app)
      .post('/api/videos') // Adjust the endpoint as needed
      .send({
        title: 'Test Video',
        description: 'This is a test video',
        // Include other necessary fields based on your schema
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('videoId');
  });

  it('should retrieve a video by ID', async () => {
    const videoId = 'dummy-video-id'; // Replace with a valid video ID from your database
    const response = await request(app).get(`/api/videos/${videoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
  });

  it('should update a video', async () => {
    const videoId = 'dummy-video-id'; // Replace with a valid video ID
    const response = await request(app)
      .put(`/api/videos/${videoId}`)
      .send({
        title: 'Updated Test Video',
        description: 'This is an updated test video',
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Video');
  });

  it('should delete a video', async () => {
    const videoId = 'dummy-video-id'; // Replace with a valid video ID
    const response = await request(app).delete(`/api/videos/${videoId}`);

    expect(response.status).toBe(204);
  });
});
