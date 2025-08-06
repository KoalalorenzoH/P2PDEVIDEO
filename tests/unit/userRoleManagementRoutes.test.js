// tests/unit/userRoleManagementRoutes.test.js

/**
 * Unit tests for user role management API routes
 *
 * These tests cover the routing logic for user role management endpoints,
 * ensuring that HTTP requests are properly handled and routed to the correct
 * controllers and middleware.
 *
 * Dependencies:
 * - src/api/userRoleManagementRoutes.js
 *
 * The tests use Jest and Supertest for HTTP assertions.
 */

const request = require('supertest');
const express = require('express');

// Import the userRoleManagementRoutes to test
const userRoleManagementRoutes = require('../../src/api/userRoleManagementRoutes');

// Create an express app instance to mount the routes
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes under /api/user-roles
app.use('/api/user-roles', userRoleManagementRoutes);

// Mock data and helpers
const validRoleData = {
  name: 'admin',
  description: 'Administrator role with full permissions'
};

const invalidRoleData = {
  name: '', // invalid empty name
  description: 'Invalid role with empty name'
};

describe('User Role Management API Routes', () => {
  describe('GET /api/user-roles', () => {
    it('should respond with 200 and return a list of user roles', async () => {
      const res = await request(app).get('/api/user-roles');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/user-roles/:id', () => {
    it('should respond with 200 and return a user role when given a valid id', async () => {
      // Using a valid mock ID (should be replaced with an actual test ID or mocked DB)
      const validId = '507f191e810c19729de860ea';
      const res = await request(app).get(`/api/user-roles/${validId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('description');
    });

    it('should respond with 404 when user role is not found', async () => {
      const nonExistentId = '000000000000000000000000';
      const res = await request(app).get(`/api/user-roles/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should respond with 400 for invalid id format', async () => {
      const invalidId = '123-invalid-id';
      const res = await request(app).get(`/api/user-roles/${invalidId}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/user-roles', () => {
    it('should create a new user role and respond with 201 and the created role', async () => {
      const res = await request(app)
        .post('/api/user-roles')
        .send(validRoleData)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', validRoleData.name);
      expect(res.body).toHaveProperty('description', validRoleData.description);
    });

    it('should respond with 400 when required fields are missing or invalid', async () => {
      const res = await request(app)
        .post('/api/user-roles')
        .send(invalidRoleData)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/user-roles/:id', () => {
    it('should update an existing user role and respond with 200 and the updated role', async () => {
      const validId = '507f191e810c19729de860ea';
      const updateData = { description: 'Updated description' };
      const res = await request(app)
        .put(`/api/user-roles/${validId}`)
        .send(updateData)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('description', updateData.description);
    });

    it('should respond with 404 when trying to update a non-existent user role', async () => {
      const nonExistentId = '000000000000000000000000';
      const updateData = { description: 'Does not exist' };
      const res = await request(app)
        .put(`/api/user-roles/${nonExistentId}`)
        .send(updateData)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should respond with 400 for invalid id format', async () => {
      const invalidId = 'invalid-id';
      const updateData = { description: 'Invalid id' };
      const res = await request(app)
        .put(`/api/user-roles/${invalidId}`)
        .send(updateData)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/user-roles/:id', () => {
    it('should delete a user role and respond with 204 on success', async () => {
      const validId = '507f191e810c19729de860ea';
      const res = await request(app).delete(`/api/user-roles/${validId}`);
      expect(res.statusCode).toBe(204);
    });

    it('should respond with 404 when trying to delete a non-existent user role', async () => {
      const nonExistentId = '000000000000000000000000';
      const res = await request(app).delete(`/api/user-roles/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should respond with 400 for invalid id format', async () => {
      const invalidId = 'bad-id';
      const res = await request(app).delete(`/api/user-roles/${invalidId}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
