const userValidation = require('../../src/utils/userValidation');

describe('User Validation Utilities', () => {
    // Test for valid user data
    test('valid user data should pass validation', () => {
        const validUser = {
            username: 'validUser123',
            password: 'ValidPassword!123',
            email: 'validuser@example.com'
        };
        expect(userValidation.validateUser(validUser)).toBe(true);
    });

    // Test for invalid username
    test('invalid username should fail validation', () => {
        const invalidUser = {
            username: '',
            password: 'ValidPassword!123',
            email: 'validuser@example.com'
        };
        expect(userValidation.validateUser(invalidUser)).toBe(false);
    });

    // Test for invalid password
    test('invalid password should fail validation', () => {
        const invalidUser = {
            username: 'validUser123',
            password: 'short',
            email: 'validuser@example.com'
        };
        expect(userValidation.validateUser(invalidUser)).toBe(false);
    });

    // Test for invalid email
    test('invalid email should fail validation', () => {
        const invalidUser = {
            username: 'validUser123',
            password: 'ValidPassword!123',
            email: 'invalidEmail'
        };
        expect(userValidation.validateUser(invalidUser)).toBe(false);
    });

    // Test for missing fields
    test('missing fields should fail validation', () => {
        const invalidUser = {
            username: 'validUser123',
            password: ''
            // Missing email
        };
        expect(userValidation.validateUser(invalidUser)).toBe(false);
    });
});