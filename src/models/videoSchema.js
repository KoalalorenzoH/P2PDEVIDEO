const mongoose = require('mongoose');

/**
 * Video Schema definition for MongoDB.
 * This schema defines the structure for video entries in the database,
 * including fields for title, description, creator, upload date,
 * and the video file URL.
 */
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    videoUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    metadata: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

// Create a model based on the schema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;