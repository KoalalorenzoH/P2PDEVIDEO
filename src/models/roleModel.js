const mongoose = require('mongoose');

// Define the Role schema for MongoDB
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    permissions: {
        type: [String], // Array of permission strings
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Compile the schema into a model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
