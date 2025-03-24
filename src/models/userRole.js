const mongoose = require('mongoose');

// Define the schema for user roles in the application
const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    permissions: {
        type: [String], // Array of permission strings
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create a model based on the schema
const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole; // Export the model to be used in other parts of the application