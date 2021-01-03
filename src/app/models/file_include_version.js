import mongoose from 'mongoose';
const { Schema } = mongoose;

const file_include = new Schema(
      {
          version_id: Number,
          item_id: Number,
          item_name: String,
          content: String,
      }
);
module.exports = mongoose.model('File',file_include);