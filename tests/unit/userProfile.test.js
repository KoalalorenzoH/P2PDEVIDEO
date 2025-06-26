// Import required modules
const request = require('supertest');
const app = require('../../app'); // Assuming the Express app is exported from this module
const UserProfileController = require('../../src/controllers/userProfileController');

// Mocking the UserProfileController methods
jest.mock('../../src/controllers/userProfileController');

describe('User Profile API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/user/profile/:id', () => {
        it('should return user profile for valid user id', async () => {
            const mockUserProfile = { id: '1', name: 'John Doe', email: 'johndoe@example.com' };  
            UserProfileController.getProfile.mockResolvedValue(mockUserProfile);

            const response = await request(app).get('/api/user/profile/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserProfile);
        });

        it('should return 404 for non-existing user id', async () => {
            UserProfileController.getProfile.mockResolvedValue(null);

            const response = await request(app).get('/api/user/profile/999');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });

    describe('PUT /api/user/profile/:id', () => {
        it('should update user profile for valid user id', async () => {
            const updatedProfile = { name: 'John Smith', email: 'johnsmith@example.com' };
            UserProfileController.updateProfile.mockResolvedValue(updatedProfile);

            const response = await request(app)
                .put('/api/user/profile/1')
                .send(updatedProfile);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedProfile);
        });

        it('should return 400 for invalid input', async () => {
            const response = await request(app)
                .put('/api/user/profile/1')
                .send({}); // Sending empty object
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid input');
        });
    });
});
