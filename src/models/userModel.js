const mongoose = require('mongoose');

// Define user schema for the MongoDB database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    roles: {
        type: [String],
        default: ['user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define methods for user schema
userSchema.methods = {
    // Method to validate password
    validatePassword: function(password) {
        return this.password === password; // Replace with hashing comparison in production
    },
};

// Create user model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
