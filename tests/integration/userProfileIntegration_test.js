const request = require('supertest');
<<<<<<< HEAD
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
=======
const app = require('../../app'); // Assuming there is an app.js file that initializes the Express app
const UserProfile = require('../../src/models/userProfileModel'); // Adjust the path as necessary

// Integration tests for user profile management

describe('User Profile Integration Tests', () => {
    let userId;

    beforeAll(async () => {
        // Set up a user for testing
        const user = await UserProfile.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'securepassword',
            // Other necessary fields
        });
        userId = user._id;
    });

    afterAll(async () => {
        // Clean up the database after tests
        await UserProfile.deleteMany();
    });

    it('should retrieve user profile', async () => {
        const response = await request(app)
            .get(`/api/user/profile/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'Test User');
        expect(response.body).toHaveProperty('email', 'testuser@example.com');
    });

    it('should update user profile', async () => {
        const response = await request(app)
            .put(`/api/user/profile/${userId}`)
            .send({ name: 'Updated User' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'Updated User');
    });

    it('should return 404 for non-existing user profile', async () => {
        const response = await request(app)
            .get(`/api/user/profile/123456789012345678901234`)
            .expect(404);

        expect(response.body).toHaveProperty('error', 'User profile not found');
    });
});
>>>>>>> ff0060b1e5e6f1befd22addf8d29d3eaa5767899
