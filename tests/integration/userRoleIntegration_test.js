const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole');

// Sample user role data for testing
const roleData = {
    name: 'Admin',
    permissions: [
        'CREATE_USER',
        'DELETE_USER',
        'VIEW_USER'
    ]
};

describe('User Role Integration Tests', () => {
    // Connect to the database before running tests
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    // Clean up after tests
    afterAll(async () => {
        await UserRole.deleteMany(); // Clear the roles collection
        await mongoose.connection.close();
    });

    test('POST /api/roles - Create a new user role', async () => {
        const response = await request(app)
            .post('/api/roles')
            .send(roleData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', roleData.name);
        expect(response.body).toHaveProperty('permissions', roleData.permissions);
    });

    test('GET /api/roles - Retrieve all user roles', async () => {
        const response = await request(app)
            .get('/api/roles')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /api/roles/:id - Retrieve a specific user role', async () => {
        const createdRole = await UserRole.create(roleData);
        const response = await request(app)
            .get(`/api/roles/${createdRole._id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', createdRole.name);
    });

    test('DELETE /api/roles/:id - Delete a user role', async () => {
        const createdRole = await UserRole.create(roleData);
        const response = await request(app)
            .delete(`/api/roles/${createdRole._id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(204);
    });
});