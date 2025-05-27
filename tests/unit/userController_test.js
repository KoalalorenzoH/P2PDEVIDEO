const request = require('supertest');
const app = require('../../src/app'); // Assuming the Express app is exported from app.js
const userController = require('../../src/controllers/userController');

// Mocking user data for testing
const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'Test@1234'
};

// Test suite for userController functions
describe('User Controller Tests', () => {
    beforeEach(() => {
        // Reset any necessary data or state before each test
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe(mockUser.username);
    });

    it('should log in a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fail to log in with incorrect password', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: mockUser.email,
                password: 'wrongpassword'
            });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    });

    it('should retrieve user profile', async () => {
        const response = await request(app)
            .get('/api/users/profile/1')
            .set('Authorization', `Bearer ${mockUser.token}`); // Assuming token is generated during login
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', mockUser.username);
    });

    it('should update user profile', async () => {
        const response = await request(app)
            .put('/api/users/profile/1')
            .set('Authorization', `Bearer ${mockUser.token}`)
            .send({
                username: 'updatedUser'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'updatedUser');
    });
});
