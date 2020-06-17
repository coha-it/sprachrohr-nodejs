const mongoose = require('mongoose');

const PodcastSchema = mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'audio'
    },
    title: String,
    desc_short: String, // Text
    desc_long: String, // Text
    author: String,
    image: String,
    post_date: {
        type: Date,
        default: Date.now
    },
    duration: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Podcast', PodcastSchema);
