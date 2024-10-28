const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js
const UserProfileController = require('../controllers/userProfileController');

// Mock data for tests
const mockUserProfile = {
    username: 'testuser',
    email: 'testuser@example.com',
    bio: 'This is a test user profile.',
};

describe('UserProfileController Tests', () => {
    it('should retrieve a user profile', async () => {
        // Mock a user profile retrieval
        const response = await request(app)
            .get('/api/user/profile/testuser') // Adjust the route accordingly
            .expect(200);

        expect(response.body.username).toBe(mockUserProfile.username);
        expect(response.body.email).toBe(mockUserProfile.email);
        expect(response.body.bio).toBe(mockUserProfile.bio);
    });

    it('should update a user profile', async () => {
        // Mock a user profile update
        const response = await request(app)
            .put('/api/user/profile/testuser') // Adjust the route accordingly
            .send({
                bio: 'Updated bio for test user.',
            })
            .expect(200);

        expect(response.body.bio).toBe('Updated bio for test user.');
    });

    it('should handle errors when retrieving a non-existing profile', async () => {
        const response = await request(app)
            .get('/api/user/profile/nonexistentuser') // Adjust the route accordingly
            .expect(404);

        expect(response.body.message).toBe('User profile not found');
    });
});