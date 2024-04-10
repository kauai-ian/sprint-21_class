// Create a mongoose schema for the user model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["LIKE", "FOLLOW", "UNLIKE", "UNFOLLOW"],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
