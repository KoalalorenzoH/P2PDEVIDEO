const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported here
const User = require('../../src/models/user'); // User model

/**
 * Unit tests for user management functionalities
 */
describe('User Management', () => {

    beforeAll(async () => {
        await User.deleteMany({}); // Clean the database before tests
    });

    afterAll(async () => {
        await User.deleteMany({}); // Clean up after tests
    });

    it('should create a new user successfully', async () => {
        const response = await request(app)
            .post('/api/users/register') // Adjust path as necessary
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.username).toBe('testuser');
    });

    it('should not create user with duplicate email', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'duplicateuser',
                password: 'password123',
                email: 'test@example.com'
            });

        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'anotheruser',
                password: 'password123',
                email: 'test@example.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email already in use');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login') // Adjust path as necessary
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fail to login with incorrect password', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

});