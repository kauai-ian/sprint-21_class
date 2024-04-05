const User = require("../models/User");
const response = require("../helpers/response");

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      return response({
        res,
        status: 400,
        message: "Request body is missing",
      });
    }
    const { nickname, sub, email, name, picture } = body;
    if (!sub || !email || !nickname) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ sub });
    if (existingUser) {
      return response({
        res,
        status: 200,
        message: "User already exists",
        data: existingUser,
      });
    }

    const newUser = new User({
      username: nickname,
      sub,
      email,
      displayName: name,
      profileImage: picture,
    });

    await newUser.save();
    return response({
      res,
      status: 201,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { sub } = req.params;
    if (!sub) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ sub });
    if (!user) {
      return response({
        res,
        status: 404,
        message: "User not found",
      });
    }

    return response({
      res,
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { sub } = req.params;
    const { body } = req;
    if (!sub || !body) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ sub });
    if (!user) {
      return response({
        res,
        status: 404,
        message: "User not found",
      });
    }

    const updatedUser = await User.findOneAndUpdate({ sub }, body, { new: true });
    return response({
      res,
      status: 200,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}