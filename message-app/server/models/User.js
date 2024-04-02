const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  displayName: {
    type: String,
    default: function() {
      return this.username;
    },
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
  },
  // TODO
  // status: {
  //   type: String,
  //   default: "active",
  // }
});

module.exports = mongoose.model("User", UserSchema);
