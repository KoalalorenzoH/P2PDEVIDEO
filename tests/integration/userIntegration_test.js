const request = require('supertest');
const app = require('../../src/app'); // Assuming app.js initializes your Express app
const User = require('../../src/models/user'); // Import the User model for testing

// Clear the database before each test
beforeEach(async () => {
    await User.deleteMany({});
});

describe('User Management Integration Tests', () => {
    it('should create a new user', async () => {
        const newUser = {
            username: 'testuser',
            password: 'Password123',
            email: 'testuser@example.com'
        };

        const response = await request(app)
            .post('/api/users/register')
            .send(newUser)
            .expect(201);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user.username).toBe(newUser.username);
    });

    it('should not create a user with duplicate email', async () => {
        const existingUser = {
            username: 'existinguser',
            password: 'Password123',
            email: 'existinguser@example.com'
        };

        await request(app)
            .post('/api/users/register')
            .send(existingUser);

        const response = await request(app)
            .post('/api/users/register')
            .send(existingUser)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Email already in use');
    });

    it('should login with valid credentials', async () => {
        const newUser = {
            username: 'testuser',
            password: 'Password123',
            email: 'testuser@example.com'
        };

        await request(app)
            .post('/api/users/register')
            .send(newUser);

        const response = await request(app)
            .post('/api/users/login')
            .send({ email: newUser.email, password: newUser.password })
            .expect(200);

        expect(response.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'wrong@example.com', password: 'wrongPassword' })
            .expect(401);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Invalid credentials');
    });

    // Add more tests as needed for other user management features
});
