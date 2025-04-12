const request = require('supertest');
const app = require('../../src/api/user');
const User = require('../../src/models/user');

// Mocking the User model for testing purposes
jest.mock('../../src/models/user');

describe('User API Endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/users/register', () => {
        it('should create a new user', async () => {
            const newUser = { username: 'testuser', password: 'password123' };
            User.create.mockResolvedValue(newUser);

            const response = await request(app)
                .post('/api/users/register')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newUser);
            expect(User.create).toHaveBeenCalledWith(newUser);
        });

        it('should return 400 for missing username', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({ password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username is required');
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in a user', async () => {
            const mockUser = { username: 'testuser', password: 'password123' };
            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/users/login')
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 for incorrect password', async () => {
            User.findOne.mockResolvedValue({ username: 'testuser', password: 'wrongpassword' });

            const response = await request(app)
                .post('/api/users/login')
                .send({ username: 'testuser', password: 'password123' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});