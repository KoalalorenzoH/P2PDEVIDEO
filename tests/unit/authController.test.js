const request = require('supertest');
const express = require('express');
const authController = require('../controllers/authController');

const app = express();

// Middleware to use the authController
app.use(express.json());
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);

describe('Authentication Controller', () => {
    describe('POST /api/auth/login', () => {
        it('should log in a user with valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'wrong@example.com', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({ email: 'newuser@example.com', password: 'newpassword123' });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User registered successfully');
        });

        it('should return 400 for duplicate email', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({ email: 'newuser@example.com', password: 'newpassword123' });

            const response = await request(app)
                .post('/api/auth/register')
                .send({ email: 'newuser@example.com', password: 'newpassword123' });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});