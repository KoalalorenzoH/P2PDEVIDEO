const request = require('supertest');
const app = require('../../src/app'); // Assuming the main app file is here

describe('User Profile Integration Tests', () => {
    let userToken;

    beforeAll(async () => {
        // Assuming there's a user registration endpoint
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });
        expect(res.statusCode).toBe(201);
        // Assume token is returned after registration or login
        userToken = res.body.token;
    });

    test('GET /api/user/profile - Should retrieve user profile', async () => {
        const res = await request(app)
            .get('/api/user/profile')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username', 'testuser');
        expect(res.body).toHaveProperty('email', 'testuser@example.com');
    });

    test('PUT /api/user/profile - Should update user profile', async () => {
        const res = await request(app)
            .put('/api/user/profile')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                username: 'updateduser',
                email: 'updateduser@example.com'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username', 'updateduser');
        expect(res.body).toHaveProperty('email', 'updateduser@example.com');
    });

    test('GET /api/user/profile - Should return 401 if no token', async () => {
        const res = await request(app)
            .get('/api/user/profile');
        expect(res.statusCode).toBe(401);
    });

    afterAll(async () => {
        // Cleanup if necessary or logout the user
        await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${userToken}`);
    });
});