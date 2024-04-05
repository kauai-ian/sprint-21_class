// Create a mongoose schema for the user model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Message", MessageSchema);
