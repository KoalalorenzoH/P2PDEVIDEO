const request = require('supertest');
const app = require('../../src/app'); // Import the main app
const User = require('../../src/models/user'); // User model
const { createUser, deleteUser } = require('./utils/userUtils'); // Utility functions for user tests

describe('User Integration Tests', () => {
  let userId;

  beforeAll(async () => {
    // Setup code to run before all tests
    const user = await createUser({ username: 'testuser', password: 'password123' });
    userId = user._id;
  });

  afterAll(async () => {
    // Cleanup code to run after all tests
    await deleteUser(userId);
  });

  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/:id should return user by ID', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('testuser');
  });

  test('POST /api/users should create a new user', async () => {
    const newUser = { username: 'newuser', password: 'newpassword123' };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe(newUser.username);
  });

  test('DELETE /api/users/:id should delete user by ID', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(204);
    const checkUser = await User.findById(userId);
    expect(checkUser).toBeNull(); // User should be deleted
  });
});
