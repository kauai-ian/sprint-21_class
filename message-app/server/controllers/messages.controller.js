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

exports.createMessage = async (req, res) => {
  let statusCode = 200;
  try {
    if (!req?.body) {
      statusCode = 400;
      throw new Error("Request body is missing");
    }

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
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: statusCode,
      message: error.message,
    });
  }
};

exports.listMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("author").populate("likes").sort({ createdDate: -1 });
    return response({
      res,
      status: 200,
      message: "Messages retrieved",
      data: messages,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findById(_id)
      .populate("author")
      .populate("likes");
    return response({
      res,
      status: 200,
      message: "Message retrieved",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findByIdAndDelete(_id);
    if (!message) {
      return response({
        res,
        status: 404,
        message: "Message not found",
      });
    }

    return response({
      res,
      status: 200,
      message: "Message deleted",
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.likeMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId } = req.body;
    console.log("LIKE MESSAGE", {
      _id,
      userId,
    });
    if (!_id || !userId) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findById(_id);
    if (!message) {
      return response({
        res,
        status: 404,
        message: "Message not found",
      });
    }
    let successMessage = "Message liked";
    if (message.likes.includes(userId)) {
      successMessage = "Message unliked";
      message.likes.pull(userId);
    } else {
      message.likes.push(userId);
    }

    await message.save();

    return response({
      res,
      status: 200,
      message: successMessage,
      data: message,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId, body } = req.body;
    if (!_id || !userId || !body) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findById(_id);
    if (!message) {
      return response({
        res,
        status: 404,
        message: "Message not found",
      });
    }
    console.log("message.author", message.author);
    if (message.author.toString() !== userId) {
      return response({
        res,
        status: 403,
        message: "Unauthorized",
      });
    }

    const newMessage = await Message.findByIdAndUpdate(
      _id,
      { body },
      { new: true }
    );
    await newMessage.save();

    return response({
      res,
      status: 200,
      message: "Message updated",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};
