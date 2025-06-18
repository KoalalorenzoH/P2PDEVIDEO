const authUtils = require('../../src/utils/auth');

describe('Authentication Utilities', () => {
    describe('generateToken', () => {
        it('should generate a valid token', () => {
            const userId = 'testUserId';
            const token = authUtils.generateToken(userId);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });
    });

    describe('verifyToken', () => {
        it('should verify a valid token', () => {
            const userId = 'testUserId';
            const token = authUtils.generateToken(userId);
            const verified = authUtils.verifyToken(token);
            expect(verified).toBeTruthy();
        });

        it('should not verify an invalid token', () => {
            const invalidToken = 'invalidToken';
            const verified = authUtils.verifyToken(invalidToken);
            expect(verified).toBeFalsy();
        });
    });

    describe('hashPassword', () => {
        it('should hash a password correctly', async () => {
            const password = 'testPassword';
            const hashed = await authUtils.hashPassword(password);
            expect(hashed).toBeDefined();
            expect(hashed).not.toBe(password);
        });
    });

    describe('comparePassword', () => {
        it('should return true for matching passwords', async () => {
            const password = 'testPassword';
            const hashed = await authUtils.hashPassword(password);
            const isMatch = await authUtils.comparePassword(password, hashed);
            expect(isMatch).toBeTruthy();
        });

        it('should return false for non-matching passwords', async () => {
            const password = 'testPassword';
            const hashed = await authUtils.hashPassword(password);
            const isMatch = await authUtils.comparePassword('wrongPassword', hashed);
            expect(isMatch).toBeFalsy();
        });
    });
});
