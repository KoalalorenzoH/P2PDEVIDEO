const request = require('supertest');
<<<<<<< HEAD
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
=======
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
>>>>>>> ff0060b1e5e6f1befd22addf8d29d3eaa5767899
