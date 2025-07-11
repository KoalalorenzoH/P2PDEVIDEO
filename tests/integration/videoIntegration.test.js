const request = require('supertest');
const app = require('../../src/app'); // Assuming your express app is exported from src/app.js
const mongoose = require('mongoose');

describe('Video Integration Tests', () => {
  let videoData;
  let createdVideoId;

  beforeAll(async () => {
    // Connect to the database before running tests
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Setup test video data
    videoData = {
      title: 'Test Video',
      description: 'This is a test video for integration testing.',
      filePath: '/path/to/video.mp4', // Mock file path or data
    };
  });

  afterAll(async () => {
    // Close the database connection after tests
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });

  // Test video upload functionality
  test('should upload a video successfully', async () => {
    const response = await request(app)
      .post('/api/videos/upload') // Adjust endpoint as necessary
      .send(videoData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Video uploaded successfully');
    expect(response.body).toHaveProperty('videoId'); // Assuming the response returns a video ID

    // Store the video ID for later tests
    if (response.body.videoId) {
      createdVideoId = response.body.videoId;
    }
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

  // Test full CRUD operations
  test('POST /api/videos - Create a new video', async () => {
    const newVideoData = {
      title: 'Test Video for CRUD',
      description: 'This is a test video description for CRUD operations',
      // Add other fields as necessary for your video schema
    };

    const response = await request(app)
      .post('/api/videos')
      .send(newVideoData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Video created successfully');
    expect(response.body).toHaveProperty('video');

    // Store the video ID for later tests
    if (response.body.video && response.body.video._id) {
      createdVideoId = response.body.video._id;
    }
  });

  test('GET /api/videos/:id - Get video by ID', async () => {
    if (!createdVideoId) {
      console.log('Skipping test - no video ID available');
      return;
    }

    const response = await request(app)
      .get(`/api/videos/${createdVideoId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('video');
    expect(response.body.video).toHaveProperty('title');
  });

  test('PUT /api/videos/:id - Update video', async () => {
    if (!createdVideoId) {
      console.log('Skipping test - no video ID available');
      return;
    }

    const updateData = {
      title: 'Updated Test Video',
    };

    const response = await request(app)
      .put(`/api/videos/${createdVideoId}`)
      .send(updateData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Video updated successfully');
  });

  test('DELETE /api/videos/:id - Delete video', async () => {
    if (!createdVideoId) {
      console.log('Skipping test - no video ID available');
      return;
    }

    const response = await request(app)
      .delete(`/api/videos/${createdVideoId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Video deleted successfully');
  });

  // Additional tests for error scenarios
  test('GET /api/videos/:id - Should return 404 for non-existing video', async () => {
    const response = await request(app)
      .get(`/api/videos/123456789012345678901234`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
  });
});
