// Create a mongoose schema for the user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  profileImage: {
    type: String,
  },
  bio: String,
  headerImage: String,
});

module.exports = mongoose.model('User', UserSchema);