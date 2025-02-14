const request = require('supertest');
const app = require('../../src/app');  // Adjust the path as necessary
const mongoose = require('mongoose');

// Sample user data for testing
const testUser = {
    username: 'testuser',
    password: 'Test@1234',
    email: 'testuser@example.com'
};

// Connect to the test database before running tests
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Clean up the test database after all tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('User Management Integration Tests', () => {
    // Test User Registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send(testUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    // Test User Login
    it('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ username: testUser.username, password: testUser.password });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Test User Profile Retrieval
    it('should retrieve user profile', async () => {
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ username: testUser.username, password: testUser.password });

        const token = loginResponse.body.token;
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', testUser.username);
    });

    // Test User Update
    it('should update the user profile', async () => {
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ username: testUser.username, password: testUser.password });

        const token = loginResponse.body.token;
        const newProfileData = { email: 'updateduser@example.com' };
        const response = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send(newProfileData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });
});
