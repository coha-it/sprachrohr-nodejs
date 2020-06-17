const mongoose = require('mongoose');

const SourceSchema = mongoose.Schema({
  _podcast : {
    type: Number,
    ref: 'Person'
  },
  src: String,
  type: String,
  prio: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Source', SourceSchema);
