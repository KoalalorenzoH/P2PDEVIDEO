const mongoose = require('mongoose');

/**
 * UserRole schema for MongoDB.
 * This schema defines the structure for user role documents in the database.
 */
const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    permissions: {
        type: [String], // Array of permission strings
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * Export the UserRole model based on the userRoleSchema
 */
module.exports = mongoose.model('UserRole', userRoleSchema);
