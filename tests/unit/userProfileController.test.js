const request = require('supertest');
const app = require('../../app'); // Adjust the path to your Express app
const userProfileController = require('../controllers/userProfileController');

// Mock user profile data for testing
const mockUserProfile = {
    id: '12345',
    username: 'testuser',
    email: 'testuser@example.com',
    profilePicture: 'http://example.com/pic.jpg'
};

describe('User Profile Controller', () => {
    describe('GET /api/user/profile/:id', () => {
        it('should return user profile data for a valid user', async () => {
            const response = await request(app)
                .get(`/api/user/profile/${mockUserProfile.id}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(mockUserProfile);
        });

        it('should return 404 for an invalid user ID', async () => {
            const response = await request(app)
                .get('/api/user/profile/99999') // Invalid ID
                .expect(404);

            expect(response.body.message).toBe('User not found');
        });
    });

    describe('PUT /api/user/profile/:id', () => {
        it('should update user profile data', async () => {
            const updatedProfile = { username: 'updatedUser' };
            const response = await request(app)
                .put(`/api/user/profile/${mockUserProfile.id}`)
                .send(updatedProfile)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.username).toBe(updatedProfile.username);
        });

        it('should return 400 for invalid update data', async () => {
            const invalidProfileUpdate = { email: 'invalid-email' };
            const response = await request(app)
                .put(`/api/user/profile/${mockUserProfile.id}`)
                .send(invalidProfileUpdate)
                .expect(400);

            expect(response.body.message).toBe('Invalid data');
        });
    });
});
