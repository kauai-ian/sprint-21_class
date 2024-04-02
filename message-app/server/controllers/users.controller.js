const User = require("../models/User");

exports.list = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// TODO validate the post body & escape the user input
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { email, name, nickname, picture, sub } = req.body;
    if (!email || !name || !nickname || !picture || !sub) {
      return res.status(400).json({ error: "Request body is invalid" });
    }

    // Check if the user exists
    const existing = await User.findOne({ sub });
    if (existing) {
      return res.status(200).json({ message: "User already exists", data: existing });
    }

    const user = await User.create({
      email,
      username: nickname,
      displayName: name,
      profileImage: picture,
      sub,
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// TODO escape the user input
exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
