const { validateUserRegistration, validateUserProfileUpdate } = require('../utils/userValidator');

describe('User Validator Utilities', () => {
    describe('validateUserRegistration', () => {
        it('should return true for valid user data', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            };
            const result = validateUserRegistration(userData);
            expect(result).toBe(true);
        });

        it('should return false for invalid email', () => {
            const userData = {
                username: 'testuser',
                email: 'invalid-email',
                password: 'password123'
            };
            const result = validateUserRegistration(userData);
            expect(result).toBe(false);
        });

        it('should return false for missing password', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: ''
            };
            const result = validateUserRegistration(userData);
            expect(result).toBe(false);
        });
    });

    describe('validateUserProfileUpdate', () => {
        it('should return true for valid profile data', () => {
            const profileData = {
                username: 'updatedUser',
                email: 'updated@example.com'
            };
            const result = validateUserProfileUpdate(profileData);
            expect(result).toBe(true);
        });

        it('should return false for invalid email format', () => {
            const profileData = {
                username: 'updatedUser',
                email: 'not-an-email'
            };
            const result = validateUserProfileUpdate(profileData);
            expect(result).toBe(false);
        });

        it('should return false for missing username', () => {
            const profileData = {
                username: '',
                email: 'valid@example.com'
            };
            const result = validateUserProfileUpdate(profileData);
            expect(result).toBe(false);
        });
    });
});