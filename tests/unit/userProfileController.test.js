const request = require('supertest');
const app = require('../../app'); // Path to your main app file
const UserProfileController = require('../controllers/userProfileController');

describe('UserProfileController', () => {
    describe('GET /api/user/profile/:id', () => {
        it('should return user profile data for a valid user ID', async () => {
            const response = await request(app)
                .get('/api/user/profile/1') // Use a valid user ID
                .expect('Content-Type', /json/) // Expect JSON response
                .expect(200);

            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('name'); // Validate response properties
        });

        it('should return 404 for a non-existent user ID', async () => {
            const response = await request(app)
                .get('/api/user/profile/9999') // Non-existent ID
                .expect(404);

            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe('PUT /api/user/profile/:id', () => {
        it('should update user profile data for a valid user ID', async () => {
            const updatedProfile = { name: 'Updated Name' };
            const response = await request(app)
                .put('/api/user/profile/1')
                .send(updatedProfile)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Profile updated successfully');
            expect(response.body).toHaveProperty('profile');
            expect(response.body.profile).toHaveProperty('name', 'Updated Name');
        });

        it('should return 400 for invalid data', async () => {
            const invalidProfile = { name: '' }; // Invalid name
            const response = await request(app)
                .put('/api/user/profile/1')
                .send(invalidProfile)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Invalid input data');
        });
    });
});