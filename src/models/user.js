const mongoose = require('mongoose');

// Define user schema for MongoDB
const userSchema = new mongoose.Schema({
    username: {  // Username for user identification
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {  // Password for user authentication
        type: String,
        required: true
    },
    email: {  // Email address for user communication
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    roles: {  // User roles for authorization
        type: [String],
        default: ['user']
    },
    createdAt: {  // Timestamp for user creation
        type: Date,
        default: Date.now
    },
    updatedAt: {  // Timestamp for last update
        type: Date,
        default: Date.now
    }
});

// Middleware to update updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create user model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the User model for use in other files
