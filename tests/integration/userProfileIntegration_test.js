const request = require('supertest');
const app = require('../../src/app'); // Assuming the main app file is here
const UserProfile = require('../../src/models/userProfileModel'); // Adjust the path as necessary

// Integration tests for user profile management
describe('User Profile Integration Tests', () => {
    let userToken;
    let userId;

    beforeAll(async () => {
        // Set up a user for testing with direct database operations
        const user = await UserProfile.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'securepassword',
            username: 'testuser'
            // Other necessary fields
        });
        userId = user._id;

        // Also test with token-based authentication
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@example.com'
            });

        if (res.statusCode === 201) {
            // Assume token is returned after registration or login
            userToken = res.body.token;
        }
    });

    afterAll(async () => {
        // Clean up the database after tests
        await UserProfile.deleteMany();

        // Cleanup if necessary or logout the user
        if (userToken) {
            await request(app)
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${userToken}`);
        }
    });

    // Test with direct database operations
    test('should retrieve user profile by ID', async () => {
        const response = await request(app)
            .get(`/api/user/profile/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'Test User');
        expect(response.body).toHaveProperty('email', 'testuser@example.com');
    });

    test('should update user profile by ID', async () => {
        const response = await request(app)
            .put(`/api/user/profile/${userId}`)
            .send({ name: 'Updated User' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'Updated User');
    });

    test('should return 404 for non-existing user profile', async () => {
        const response = await request(app)
            .get(`/api/user/profile/123456789012345678901234`)
            .expect(404);

        expect(response.body).toHaveProperty('error', 'User profile not found');
    });

    // Test with token-based authentication
    test('GET /api/user/profile - Should retrieve user profile with token', async () => {
        if (!userToken) {
            console.log('Skipping token-based test - no token available');
            return;
        }

        const res = await request(app)
            .get('/api/user/profile')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username', 'testuser2');
        expect(res.body).toHaveProperty('email', 'testuser2@example.com');
    });

    test('PUT /api/user/profile - Should update user profile with token', async () => {
        if (!userToken) {
            console.log('Skipping token-based test - no token available');
            return;
        }

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
});
