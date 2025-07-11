const request = require('supertest');
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
