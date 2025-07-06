const request = require('supertest');
const app = require('../../src/app'); // Adjust the path to your main app file
const Role = require('../../src/models/roleModel'); // Adjust the path to your role model

/**
 * Integration tests for user role management
 */
describe('User Role Management Integration Tests', () => {
    let newRoleId;

    beforeAll(async () => {
        // Clear the roles collection before running tests
        await Role.deleteMany({});
    });

    test('POST /api/roles - should create a new role', async () => {
        const response = await request(app)
            .post('/api/roles')
            .send({ name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Admin');
        newRoleId = response.body._id;  // Store the new role ID for later tests
    });

    test('GET /api/roles - should return all roles', async () => {
        const response = await request(app).get('/api/roles');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/roles/:id - should return a role by ID', async () => {
        const response = await request(app).get(`/api/roles/${newRoleId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', newRoleId);
        expect(response.body.name).toBe('Admin');
    });

    test('PUT /api/roles/:id - should update a role', async () => {
        const response = await request(app)
            .put(`/api/roles/${newRoleId}`)
            .send({ name: 'Super Admin', permissions: ['all'] });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Super Admin');
    });

    test('DELETE /api/roles/:id - should delete a role', async () => {
        const response = await request(app).delete(`/api/roles/${newRoleId}`);

        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        // Clean up the database after tests
        await Role.deleteMany({});
    });
});