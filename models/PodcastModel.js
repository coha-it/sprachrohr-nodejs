const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    duration: Number,

    sources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source' 
    }]


    // sources: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Source"
    // }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Podcast', PodcastSchema);
