const request = require('supertest');
const app = require('../../src/app'); // Update with the correct path to your app
const mongoose = require('mongoose');

describe('User Role Management Integration Tests', () => {
    beforeAll(async () => {
        // Connect to in-memory MongoDB or your testing database
        await mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user role', async () => {
        const roleData = { name: 'Admin', permissions: ['READ', 'WRITE', 'DELETE'] };
        const response = await request(app).post('/api/roles').send(roleData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Admin');
    });

    it('should retrieve all user roles', async () => {
        const response = await request(app).get('/api/roles');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a user role', async () => {
        const roleData = { name: 'Admin', permissions: ['READ', 'WRITE'] };
        const createResponse = await request(app).post('/api/roles').send(roleData);
        const roleId = createResponse.body._id;
        const updatedData = { name: 'Super Admin', permissions: ['READ', 'WRITE', 'DELETE'] };
        const updateResponse = await request(app).put(`/api/roles/${roleId}`).send(updatedData);
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty('name', 'Super Admin');
    });

    it('should delete a user role', async () => {
        const roleData = { name: 'Admin', permissions: ['READ', 'WRITE', 'DELETE'] };
        const createResponse = await request(app).post('/api/roles').send(roleData);
        const roleId = createResponse.body._id;
        const deleteResponse = await request(app).delete(`/api/roles/${roleId}`);
        expect(deleteResponse.status).toBe(204);
    });
});