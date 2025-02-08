const request = require('supertest');
const app = require('../../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole');

/**
 * Integration tests for user role management.
 */
describe('User Role Management Integration Tests', () => {
    // Connect to the database before running the tests
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    // Cleanup after tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user role', async () => {
        const newRole = { name: 'Admin', permissions: ['read', 'write', 'delete'] };
        const response = await request(app)
            .post('/api/userRoles') // Adjust endpoint as necessary
            .send(newRole)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('role');
        expect(response.body.role.name).toBe(newRole.name);
    });

    it('should fetch all user roles', async () => {
        const response = await request(app)
            .get('/api/userRoles') // Adjust endpoint as necessary
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a user role', async () => {
        const roleToUpdate = await UserRole.findOne({ name: 'Admin' });
        const updatedRole = { name: 'Super Admin', permissions: ['read', 'write'] };
        const response = await request(app)
            .put(`/api/userRoles/${roleToUpdate._id}`) // Adjust endpoint as necessary
            .send(updatedRole)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.role.name).toBe(updatedRole.name);
    });

    it('should delete a user role', async () => {
        const roleToDelete = await UserRole.findOne({ name: 'Super Admin' });
        const response = await request(app)
            .delete(`/api/userRoles/${roleToDelete._id}`) // Adjust endpoint as necessary
            .set('Accept', 'application/json');

        expect(response.status).toBe(204); // No content
    });
});
