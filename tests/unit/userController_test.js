const request = require('supertest');
const app = require('../../app'); // Assuming the app is exported from this path
const UserController = require('../../controllers/userController');

describe('User Controller Tests', () => {
  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/users/register') // Change this to the actual endpoint
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('userId');
      expect(response.body.username).toBe('testuser');
    });

    it('should return 400 for duplicate username', async () => {
      await request(app)
        .post('/api/users/register')
        .send({ username: 'testuser', password: 'testpassword' }); // Register first

      const response = await request(app)
        .post('/api/users/register') // Attempt to register again
        .send({ username: 'testuser', password: 'newpassword' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Username already exists');
    });
  });

  describe('User Login', () => {
    it('should login an existing user successfully', async () => {
      await request(app)
        .post('/api/users/register')
        .send({ username: 'testuser', password: 'testpassword' }); // Register first

      const response = await request(app)
        .post('/api/users/login') // Change this to the actual login endpoint
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for incorrect password', async () => {
      await request(app)
        .post('/api/users/register')
        .send({ username: 'testuser', password: 'testpassword' }); // Register first

      const response = await request(app)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});