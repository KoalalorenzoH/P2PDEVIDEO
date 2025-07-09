const request = require('supertest');
const app = require('../../src/app'); // Path to your Express app
const { connectDB, disconnectDB } = require('../../src/config/db');

// Connect to the database before running the tests
beforeAll(async () => {
    await connectDB();
});

// Disconnect from the database after tests are complete
afterAll(async () => {
    await disconnectDB();
});

describe('User Role Management Integration Tests', () => {
    let roleId;

    // Test for creating a role
    test('POST /api/roles - create a new role', async () => {
        const res = await request(app)
            .post('/api/roles')
            .send({ name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('role');
        roleId = res.body.role._id; // Store the created role ID for further tests
    });

    // Test for retrieving roles
    test('GET /api/roles - retrieve all roles', async () => {
        const res = await request(app)
            .get('/api/roles');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test for updating a role
    test('PUT /api/roles/:id - update a role', async () => {
        const res = await request(app)
            .put(`/api/roles/${roleId}`)
            .send({ name: 'Super Admin', permissions: ['read', 'delete'] });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('role');
        expect(res.body.role.name).toBe('Super Admin');
    });

    // Test for deleting a role
    test('DELETE /api/roles/:id - delete a role', async () => {
        const res = await request(app)
            .delete(`/api/roles/${roleId}`);

        expect(res.statusCode).toBe(204);
    });
});