const mongoose =require('mongoose');
const { Schema } = mongoose;
const Version = new Schema({
  version_id:  String, // String is shorthand for {type: String}
  version_name: String,
  type:   String,
  moddified: { type: Date, default: Date.now },
  total_size: Number,
  description: String,
});
module.exports = mongoose.model('Version',Version);