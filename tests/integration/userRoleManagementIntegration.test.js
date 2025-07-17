/**
 * Integration tests for User Role Management API
 *
 * This test suite covers the main user role management functionalities:
 * - Creating user roles
 * - Fetching user roles
 * - Updating user roles
 * - Deleting user roles
 *
 * The tests assume a running Express server app and a test database environment.
 * It uses supertest for HTTP assertions and Jest as the test runner.
 */

const request = require('supertest');
const app = require('../../src/api/userRoleManagement');
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole');

// Sample test data
const testRole = {
  name: 'testrole',
  description: 'A test role for integration testing',
  permissions: ['read', 'write']
};

const updatedRole = {
  name: 'updatedrole',
  description: 'Updated description',
  permissions: ['read', 'write', 'delete']
};

let createdRoleId;

// Setup and teardown
beforeAll(async () => {
  // Connect to a test database (assumed to be set in env variables or config)
  const mongoUri = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/p2pdevideo_test';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Clean up test data
  if (createdRoleId) {
    await UserRole.findByIdAndDelete(createdRoleId);
  }
  await mongoose.connection.close();
});

// Clear roles collection before each test suite run
beforeEach(async () => {
  await UserRole.deleteMany({ name: /testrole|updatedrole/i });
});

describe('User Role Management Integration Tests', () => {
  test('POST /roles - should create a new user role', async () => {
    const response = await request(app)
      .post('/roles')
      .send(testRole)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testRole.name);
    expect(response.body.description).toBe(testRole.description);
    expect(response.body.permissions).toEqual(expect.arrayContaining(testRole.permissions));
    createdRoleId = response.body._id;
  });

  test('GET /roles - should retrieve all user roles including the created one', async () => {
    // Ensure a role exists
    const role = new UserRole(testRole);
    await role.save();

    const response = await request(app)
      .get('/roles')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some(r => r.name === testRole.name)).toBe(true);
  });

  test('GET /roles/:id - should retrieve a user role by ID', async () => {
    const role = new UserRole(testRole);
    await role.save();

    const response = await request(app)
      .get(`/roles/${role._id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', role._id.toString());
    expect(response.body.name).toBe(testRole.name);
  });

  test('PUT /roles/:id - should update an existing user role', async () => {
    const role = new UserRole(testRole);
    await role.save();

    const response = await request(app)
      .put(`/roles/${role._id}`)
      .send(updatedRole)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.name).toBe(updatedRole.name);
    expect(response.body.description).toBe(updatedRole.description);
    expect(response.body.permissions).toEqual(expect.arrayContaining(updatedRole.permissions));
  });

  test('DELETE /roles/:id - should delete an existing user role', async () => {
    const role = new UserRole(testRole);
    await role.save();

    await request(app)
      .delete(`/roles/${role._id}`)
      .expect(204);

    const deletedRole = await UserRole.findById(role._id);
    expect(deletedRole).toBeNull();
  });

  test('GET /roles/:id - should return 404 for non-existing role', async () => {
    const fakeId = mongoose.Types.ObjectId();
    await request(app)
      .get(`/roles/${fakeId}`)
      .expect(404);
  });

  test('PUT /roles/:id - should return 404 when updating non-existing role', async () => {
    const fakeId = mongoose.Types.ObjectId();
    await request(app)
      .put(`/roles/${fakeId}`)
      .send(updatedRole)
      .expect(404);
  });

  test('DELETE /roles/:id - should return 404 when deleting non-existing role', async () => {
    const fakeId = mongoose.Types.ObjectId();
    await request(app)
      .delete(`/roles/${fakeId}`)
      .expect(404);
  });
});
