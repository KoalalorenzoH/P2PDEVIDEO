const mongoose = require('mongoose');
const UserProfile = require('../models/userProfileModel');

// Define a test suite for UserProfile model
describe('UserProfile Model', () => {
    beforeAll(async () => {
        // Connect to the in-memory database for testing
        const url = 'mongodb://127.0.0.1/test';
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect from the database after tests
        await mongoose.connection.close();
    });

    // Test for creating a new user profile
    test('should create a new user profile', async () => {
        const profileData = { name: 'John Doe', email: 'john.doe@example.com', age: 30 };
        const userProfile = new UserProfile(profileData);
        const savedProfile = await userProfile.save();

        expect(savedProfile._id).toBeDefined();
        expect(savedProfile.name).toBe(profileData.name);
        expect(savedProfile.email).toBe(profileData.email);
        expect(savedProfile.age).toBe(profileData.age);
    });

    // Test for finding a user profile
    test('should find a user profile by email', async () => {
        const email = 'john.doe@example.com';
        const foundProfile = await UserProfile.findOne({ email });

        expect(foundProfile).toBeDefined();
        expect(foundProfile.email).toBe(email);
    });

    // Test for updating a user profile
    test('should update a user profile', async () => {
        const email = 'john.doe@example.com';
        const updatedData = { age: 31 };
        await UserProfile.updateOne({ email }, { $set: updatedData });

        const updatedProfile = await UserProfile.findOne({ email });
        expect(updatedProfile.age).toBe(updatedData.age);
    });

    // Test for deleting a user profile
    test('should delete a user profile', async () => {
        const email = 'john.doe@example.com';
        await UserProfile.deleteOne({ email });

        const deletedProfile = await UserProfile.findOne({ email });
        expect(deletedProfile).toBeNull();
    });
});