const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = mongoose.Schema({
  src: String,
  type: String,
  prio: Number,

  podcast: { 
    type: Schema.Types.ObjectId,
    ref: 'Podcast' 
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Source', SourceSchema);
