const request = require('supertest');
const app = require('../../app'); // Assuming app is exported from your main file
const userProfileController = require('../controllers/userProfileController');

describe('User Profile Controller', () => {
  beforeAll(async () => {
    // Setup code before tests run, like connecting to the database
  });

  afterAll(async () => {
    // Cleanup code after tests are done, like closing the database connection
  });

  describe('GET /user/profile/:id', () => {
    it('should return user profile if user exists', async () => {
      const response = await request(app)
        .get('/user/profile/123') // Replace with valid user ID
        .expect('Content-Type', /json/)  
        .expect(200);

      expect(response.body).toHaveProperty('id', '123'); // Adjust according to actual profile structure
      expect(response.body).toHaveProperty('name'); // Assuming profile has a name
    });

    it('should return 404 if user does not exist', async () => {
      const response = await request(app)
        .get('/user/profile/999') // Non-existing user ID
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('PUT /user/profile/:id', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/user/profile/123')
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .put('/user/profile/123')
        .send({ name: '' }) // Assuming name cannot be empty
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid data');
    });
  });
});