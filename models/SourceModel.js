const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = mongoose.Schema({
  // _podcast : {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Person'
  // },
  src: String,
  type: String,
  prio: Number,

  _podcast: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Podcast' 
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Source', SourceSchema);
