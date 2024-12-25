const request = require('supertest');
const app = require('../../app'); // Import your app
const UserProfile = require('../../models/userProfile'); // Adjust path as necessary

// Sample user profile data for testing
const sampleProfile = {
    username: 'testuser',
    email: 'testuser@example.com',
    age: 25,
    bio: 'This is a test user.'
};

describe('User Profile Management', () => {
    beforeAll(async () => {
        // Clear existing user profiles before tests
        await UserProfile.deleteMany({});
    });

    afterAll(async () => {
        // Close any connections after tests
        await UserProfile.deleteMany({});
    });

    it('should create a new user profile', async () => {
        const response = await request(app)
            .post('/api/user/profiles')
            .send(sampleProfile)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe(sampleProfile.username);
        expect(response.body.email).toBe(sampleProfile.email);
    });

    it('should get user profile by ID', async () => {
        const createdProfile = await UserProfile.create(sampleProfile);
        const response = await request(app)
            .get(`/api/user/profiles/${createdProfile._id}`)
            .expect(200);

        expect(response.body).toMatchObject(sampleProfile);
    });

    it('should update a user profile', async () => {
        const createdProfile = await UserProfile.create(sampleProfile);
        const updatedProfile = { ...sampleProfile, age: 30 };

        const response = await request(app)
            .put(`/api/user/profiles/${createdProfile._id}`)
            .send(updatedProfile)
            .expect(200);

        expect(response.body.age).toBe(30);
    });

    it('should delete a user profile', async () => {
        const createdProfile = await UserProfile.create(sampleProfile);
        await request(app)
            .delete(`/api/user/profiles/${createdProfile._id}`)
            .expect(204);

        const findProfile = await UserProfile.findById(createdProfile._id);
        expect(findProfile).toBeNull();
    });
});