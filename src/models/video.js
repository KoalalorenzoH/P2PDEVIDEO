const mongoose = require('mongoose');

// Define the video schema for MongoDB
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
videoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Video model from the schema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;