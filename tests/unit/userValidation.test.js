const request = require('supertest');
const express = require('express');
const userValidation = require('../middleware/userValidation');

const app = express();
app.use(express.json());

app.post('/test-validation', userValidation, (req, res) => {
    res.status(200).send('Validation passed!');
});

describe('User Validation Middleware', () => {
    test('should return 400 if the user data is invalid', async () => {
        const response = await request(app)
            .post('/test-validation')
            .send({ username: '', password: '' }); // Invalid data
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid user data'); // Assuming this is the error message you send
    });

    test('should call next if the user data is valid', async () => {
        const response = await request(app)
            .post('/test-validation')
            .send({ username: 'validUser', password: 'SecurePassword123' }); // Valid data
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Validation passed!');
    });
});
