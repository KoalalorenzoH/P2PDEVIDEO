// auth_test.js

const { registerUser, loginUser, validateToken } = require('../../src/utils/auth');
const { expect } = require('chai');
const sinon = require('sinon');

// Mock data for testing
const mockUser = {
    username: 'testuser',
    password: 'P@ssw0rd',
};

describe('Authentication Utilities', () => {
    describe('registerUser', () => {
        it('should successfully register a user with valid data', async () => {
            const result = await registerUser(mockUser);
            expect(result).to.have.property('success', true);
            expect(result).to.have.property('message', 'User registered successfully.');
        });

        it('should fail to register a user with existing username', async () => {
            await registerUser(mockUser); // Register first time
            const result = await registerUser(mockUser); // Attempt to register again
            expect(result).to.have.property('success', false);
            expect(result).to.have.property('message', 'Username already exists.');
        });
    });

    describe('loginUser', () => {
        it('should successfully login a user with valid credentials', async () => {
            await registerUser(mockUser); // Ensure the user is registered
            const result = await loginUser(mockUser.username, mockUser.password);
            expect(result).to.have.property('success', true);
            expect(result).to.have.property('token');
        });

        it('should fail to login a user with invalid credentials', async () => {
            const result = await loginUser(mockUser.username, 'wrongpassword');
            expect(result).to.have.property('success', false);
            expect(result).to.have.property('message', 'Invalid username or password.');
        });
    });

    describe('validateToken', () => {
        it('should validate a correct token', () => {
            const token = 'valid_token'; // Mock token
            const result = validateToken(token);
            expect(result).to.have.property('valid', true);
        });

        it('should invalidate an incorrect token', () => {
            const token = 'invalid_token'; // Mock token
            const result = validateToken(token);
            expect(result).to.have.property('valid', false);
        });
    });
});