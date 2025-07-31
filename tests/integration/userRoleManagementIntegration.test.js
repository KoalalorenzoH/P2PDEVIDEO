// tests/integration/userRoleManagementIntegration.test.js

/**
 * Integration tests for user role management API routes
 *
 * This test suite covers the main functionalities of the user role management API,
 * including creating, retrieving, updating, and deleting user roles.
 *
 * Dependencies:
 * - src/api/userRoleManagementRoutes.js
 *
 * Testing framework: Jest
 * HTTP request library: supertest
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app'); // Assuming Express app is exported from src/app.js
const UserRole = require('../../src/models/userRole');

// Test user role data samples
const testRoleData = {
  name: 'testRole',
  description: 'A test role for integration tests',
  permissions: ['read', 'write']
};

// Updated data for role update
const updatedRoleData = {
  name: 'updatedTestRole',
  description: 'Updated description',
  permissions: ['read']
};

describe('User Role Management API Integration Tests', () => {
  let server;
  let createdRoleId;

  beforeAll(async () => {
    // Connect to the test database
    const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/p2pdevideo_test';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Start the server if needed (assuming app.listen returns server instance)
    server = app.listen(0); // use ephemeral port
  });

  afterAll(async () => {
    // Cleanup: delete created roles
    if (createdRoleId) {
      await UserRole.findByIdAndDelete(createdRoleId);
    }

    await mongoose.connection.close();
    if (server) {
      server.close();
    }
  });

  test('POST /api/user-roles - Create a new user role', async () => {
    const response = await request(server)
      .post('/api/user-roles')
      .send(testRoleData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testRoleData.name);
    expect(response.body.description).toBe(testRoleData.description);
    expect(Array.isArray(response.body.permissions)).toBe(true);
    expect(response.body.permissions).toEqual(expect.arrayContaining(testRoleData.permissions));

    createdRoleId = response.body._id;
  });

  test('GET /api/user-roles/:id - Retrieve the created user role', async () => {
    const response = await request(server)
      .get(`/api/user-roles/${createdRoleId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdRoleId);
    expect(response.body.name).toBe(testRoleData.name);
  });

  test('PUT /api/user-roles/:id - Update the user role', async () => {
    const response = await request(server)
      .put(`/api/user-roles/${createdRoleId}`)
      .send(updatedRoleData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdRoleId);
    expect(response.body.name).toBe(updatedRoleData.name);
    expect(response.body.description).toBe(updatedRoleData.description);
    expect(response.body.permissions).toEqual(expect.arrayContaining(updatedRoleData.permissions));
  });

  test('GET /api/user-roles - Retrieve list of user roles', async () => {
    const response = await request(server)
      .get('/api/user-roles')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    // The created role should be in the list
    const foundRole = response.body.find(role => role._id === createdRoleId);
    expect(foundRole).toBeDefined();
  });

  test('DELETE /api/user-roles/:id - Delete the user role', async () => {
    await request(server)
      .delete(`/api/user-roles/${createdRoleId}`)
      .expect(204);

    // Verify deletion
    const getResponse = await request(server)
      .get(`/api/user-roles/${createdRoleId}`)
      .expect(404);

    createdRoleId = null; // Role deleted
  });

  test('GET /api/user-roles/:id - Return 404 for non-existent role', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(server)
      .get(`/api/user-roles/${nonExistentId}`)
      .expect(404);
  });

  test('PUT /api/user-roles/:id - Return 404 for updating non-existent role', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(server)
      .put(`/api/user-roles/${nonExistentId}`)
      .send(updatedRoleData)
      .expect(404);
  });

  test('DELETE /api/user-roles/:id - Return 404 for deleting non-existent role', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(server)
      .delete(`/api/user-roles/${nonExistentId}`)
      .expect(404);
  });

  test('POST /api/user-roles - Return 400 for missing required fields', async () => {
    const invalidData = {
      description: 'Missing name field'
    };
    await request(server)
      .post('/api/user-roles')
      .send(invalidData)
      .expect(400);
  });
});
