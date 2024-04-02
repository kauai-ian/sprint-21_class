const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: { // comes from Auth0 sub
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: () => this.username,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  // TODO
  // status: {
  //   type: String,
  //   default: "active",
  // }
});

module.exports = mongoose.model("User", UserSchema);
