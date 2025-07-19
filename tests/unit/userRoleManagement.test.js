// Unit tests for user role management functionality

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Assuming src/api/userRoleManagement.js exports an Express router
const userRoleManagementRoutes = require('../../src/api/userRoleManagement');

// Setup an Express app for testing the API routes
const app = express();
app.use(bodyParser.json());
app.use('/api/user-roles', userRoleManagementRoutes);

// Mock database or service layer could be used here for isolation
// For demonstration, we will assume the API uses in-memory or mocked data

describe('User Role Management API', () => {
  let createdRoleId = null;

  // Test role creation
  describe('POST /api/user-roles', () => {
    it('should create a new user role', async () => {
      const newRole = {
        name: 'testRole',
        permissions: ['read', 'write']
      };

      const response = await request(app)
        .post('/api/user-roles')
        .send(newRole)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newRole.name);
      expect(response.body.permissions).toEqual(expect.arrayContaining(newRole.permissions));
      createdRoleId = response.body.id;
    });

    it('should return 400 for invalid role data', async () => {
      const invalidRole = {
        // Missing name
        permissions: ['read']
      };

      const response = await request(app)
        .post('/api/user-roles')
        .send(invalidRole)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  // Test fetching roles
  describe('GET /api/user-roles', () => {
    it('should retrieve a list of user roles', async () => {
      const response = await request(app)
        .get('/api/user-roles')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // If a role was created in previous test, it should be present
      if (createdRoleId) {
        const role = response.body.find(r => r.id === createdRoleId);
        expect(role).toBeDefined();
      }
    });
  });

  // Test fetching a single role by ID
  describe('GET /api/user-roles/:id', () => {
    it('should retrieve the role by id', async () => {
      if (!createdRoleId) return;

      const response = await request(app)
        .get(`/api/user-roles/${createdRoleId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdRoleId);
    });

    it('should return 404 for non-existing role', async () => {
      const response = await request(app)
        .get('/api/user-roles/invalidId123')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  // Test updating a role
  describe('PUT /api/user-roles/:id', () => {
    it('should update the existing user role', async () => {
      if (!createdRoleId) return;

      const updates = { permissions: ['read', 'write', 'delete'] };

      const response = await request(app)
        .put(`/api/user-roles/${createdRoleId}`)
        .send(updates)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdRoleId);
      expect(response.body.permissions).toEqual(expect.arrayContaining(updates.permissions));
    });

    it('should return 404 when updating non-existing role', async () => {
      const updates = { permissions: ['read'] };

      const response = await request(app)
        .put('/api/user-roles/nonExistingId')
        .send(updates)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid update data', async () => {
      if (!createdRoleId) return;

      const invalidUpdates = { permissions: 'not-an-array' };

      const response = await request(app)
        .put(`/api/user-roles/${createdRoleId}`)
        .send(invalidUpdates)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  // Test deleting a role
  describe('DELETE /api/user-roles/:id', () => {
    it('should delete the existing user role', async () => {
      if (!createdRoleId) return;

      const response = await request(app)
        .delete(`/api/user-roles/${createdRoleId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 when deleting non-existing role', async () => {
      const response = await request(app)
        .delete('/api/user-roles/nonExistingId')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
