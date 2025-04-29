const request = require('supertest');
const app = require('../../src/app'); // Import your app
const User = require('../../src/models/user'); // Import User model

// Mock data for tests
const mockUser = {
    username: 'testuser',
    password: 'Password123!',
    email: 'testuser@example.com'
};

describe('User API Endpoints', () => {
    // Test case for user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    // Test case for user login
    it('should log in the user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ username: mockUser.username, password: mockUser.password });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Test case for user profile retrieval
    it('should retrieve the user profile', async () => {
        // Assuming a valid token is generated during login
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ username: mockUser.username, password: mockUser.password });
        const token = loginResponse.body.token;

        const profileResponse = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(profileResponse.status).toBe(200);
        expect(profileResponse.body).toHaveProperty('username', mockUser.username);
    });

    // Clean up mock data after tests
    afterAll(async () => {
        await User.deleteMany({}); // Remove all users created during tests
    });
});
