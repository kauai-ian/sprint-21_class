const Message = require("../models/Message");
const { broadcast } = require("../utils/socket");

exports.list = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("author")
      .populate("likes")
      .sort({ createdDate: -1 });
    return res.json({ data: messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("author")
      .populate("likes");
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.json({ data: message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// TODO: validate the post body & escape the user input
exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const newMessage = await Message.create(req.body);
    await newMessage.save();
    console.log(newMessage);
    const message = await Message.findById(newMessage._id)
      .populate("author")
      .populate("likes");

    broadcast(req.app.locals.clients, { data: message, type: "NEW_MESSAGE" });
    return res.status(201).json({ data: message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// TODO: escape the user input
exports.update = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.json({ data: message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Message.findByIdAndRemove(req.params.id);
    return res.json({ data: message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
