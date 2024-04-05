const mongoose = require("mongoose");
// To support auth0 we need to add the author field as a virtual field
const MessageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    authorId: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
    likeIds: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
MessageSchema.virtual("likes", {
  ref: "User",
  localField: "likeIds",
  foreignField: "sub",
});

MessageSchema.virtual("author", {
  ref: "User",
  localField: "authorId",
  foreignField: "sub",
  justOne: true,
});

module.exports = mongoose.model("Message", MessageSchema);
