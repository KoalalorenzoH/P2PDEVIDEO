const request = require('supertest');
const express = require('express');
const userProfileController = require('../controllers/userProfileController');

const app = express();
app.use(express.json());
app.use('/api/profile', userProfileController);

describe('User Profile Controller', () => {
    it('should retrieve user profile by ID', async () => {
        const response = await request(app)
            .get('/api/profile/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name');
    });

    it('should return 404 for non-existent user profile', async () => {
        const response = await request(app)
            .get('/api/profile/999')
            .expect(404);

        expect(response.body).toHaveProperty('error', 'User profile not found');
    });

    it('should update user profile', async () => {
        const response = await request(app)
            .put('/api/profile/1')
            .send({ name: 'Updated Name' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });

    it('should return 400 for invalid update request', async () => {
        const response = await request(app)
            .put('/api/profile/1')
            .send({})
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Invalid profile data');
    });

    it('should delete user profile', async () => {
        const response = await request(app)
            .delete('/api/profile/1')
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Profile deleted successfully');
    });

    it('should return 404 when deleting non-existent profile', async () => {
        const response = await request(app)
            .delete('/api/profile/999')
            .expect(404);

        expect(response.body).toHaveProperty('error', 'User profile not found');
    });
});