const mongoose = require('mongoose');

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['user'] }, // e.g., ['user', 'admin']
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to update the timestamp
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Method to generate a user profile (excluding sensitive data)
userSchema.methods.getPublicProfile = function() {
    return {
        username: this.username,
        email: this.email,
        roles: this.roles,
        createdAt: this.createdAt
    };
};

// Create the User model based on the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
