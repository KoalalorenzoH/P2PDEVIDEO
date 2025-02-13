const request = require('supertest');
const app = require('../../src/app'); // Adjust the path according to your project structure

/**
 * Integration tests for user management features.
 */
describe('User Management Integration Tests', () => {
    let userId;

    beforeAll(async () => {
        // Code to set up the initial state before tests run
    });

    afterAll(async () => {
        // Code to clean up after tests run
    });

    test('User Registration', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        userId = response.body.userId; // Save userId for later tests
    });

    test('User Login', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('Get User Profile', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`); // Assume token obtained from login

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
    });

    test('User Role Management', async () => {
        const response = await request(app)
            .post(`/api/users/${userId}/roles`)
            .send({
                role: 'admin'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Role assigned successfully');
    });
});
