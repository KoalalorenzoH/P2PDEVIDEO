const mongoose = require('mongoose');

/**
 * Video model schema for MongoDB.
 * This schema defines the structure of video documents in the database.
 */
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    uploaderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    metadata: {
        resolution: { type: String },
        duration: { type: Number },
        contentType: { type: String },
        encryption: { type: Boolean, default: false }
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

// Middleware to update the updatedAt field on save
videoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;