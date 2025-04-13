const request = require('supertest');
const app = require('../../src/app'); // Make sure to adjust the path to your app
const UserProfile = require('../../src/models/userProfileModel'); // Import the UserProfile model

describe('User Profile Management', () => {
    let userProfileId;

    beforeEach(async () => {
        // Setup a sample user profile before each test
        const userProfile = await UserProfile.create({
            username: 'testuser',
            email: 'testuser@example.com',
            bio: 'This is a test user profile.'
        });
        userProfileId = userProfile._id;
    });

    afterEach(async () => {
        // Clean up the database after each test
        await UserProfile.deleteMany();
    });

    test('GET /api/userProfile/:id should return user profile', async () => {
        const response = await request(app)
            .get(`/api/userProfile/${userProfileId}`)
            .expect(200);

        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'testuser@example.com');
        expect(response.body).toHaveProperty('bio', 'This is a test user profile.');
    });

    test('PUT /api/userProfile/:id should update user profile', async () => {
        const response = await request(app)
            .put(`/api/userProfile/${userProfileId}`)
            .send({
                bio: 'Updated bio for test user.'
            })
            .expect(200);

        expect(response.body).toHaveProperty('bio', 'Updated bio for test user.');
    });

    test('DELETE /api/userProfile/:id should delete user profile', async () => {
        await request(app)
            .delete(`/api/userProfile/${userProfileId}`)
            .expect(204);

        const deletedProfile = await UserProfile.findById(userProfileId);
        expect(deletedProfile).toBeNull();
    });
});