const request = require('supertest');
const app = require('../../src/app'); // Adjust the path based on your application structure
const User = require('../../src/models/userModel');
const userProfileController = require('../../src/controllers/userProfileController');

// Sample user data for testing
const sampleUser = {
    username: 'testuser',
    password: 'testpassword',
    email: 'testuser@example.com'
};

let userId;

describe('User Profile Integration Tests', () => {
    beforeAll(async () => {
        // Create a user for testing
        const user = await User.create(sampleUser);
        userId = user._id;
    });

    afterAll(async () => {
        // Clean up: delete the user after tests
        await User.findByIdAndDelete(userId);
    });

    describe('GET /api/user-profile/:id', () => {
        it('should return user profile data', async () => {
            const response = await request(app)
                .get(`/api/user-profile/${userId}`)
                .expect(200);

            expect(response.body).toHaveProperty('username', sampleUser.username);
            expect(response.body).toHaveProperty('email', sampleUser.email);
        });

        it('should return 404 for non-existent user', async () => {
            const response = await request(app)
                .get('/api/user-profile/invalidId')
                .expect(404);

            expect(response.body).toHaveProperty('message', 'User not found');
        });
    });

    describe('PUT /api/user-profile/:id', () => {
        it('should update user profile data', async () => {
            const updatedData = { username: 'updateduser', email: 'updated@example.com' };
            const response = await request(app)
                .put(`/api/user-profile/${userId}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('username', updatedData.username);
            expect(response.body).toHaveProperty('email', updatedData.email);
        });

        it('should return 400 for invalid data', async () => {
            const invalidData = { username: '', email: 'not-an-email' };
            const response = await request(app)
                .put(`/api/user-profile/${userId}`)
                .send(invalidData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });
    });
});
