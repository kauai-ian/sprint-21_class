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

    const user = await User.findOne({ sub }).populate("followers").populate("following");
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
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    return response({
      res,
      status: 200,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}

exports.followUser = async (req, res, message) => {
  try {
    const { sub } = req.params;
    if (!sub || !req.body) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const { currentUserId } = req.body;
    if (!currentUserId) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const targetUser = await User.findOne({ sub });
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return response({
        res,
        status: 404,
        message: "Current User or target user not found",
      });
    }

    // check if user is already following each other
    if (currentUser.following.includes(targetUser._id) || targetUser.followers.includes(currentUserId)) {
      return response({
        res,
        status: 400,
        message: "User already followed",
      });
    }

    // add the current user to the followers list of the target user and vice versa
    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUser._id);
    await targetUser.save();
    await currentUser.save();
    
// like message
    const authorId = message.author;
    const author = await User.findById(authorId)
    if(!author) {
      return response({
        res, status: 404, message: "Author not found"
      })
    }
    if (successMessage === "Message liked") {
      author.postsLiked.push(_id)
    } else {
      author.postsLiked.pull(_id)
    } 
    await author.save()

// create a notification for the target user
const notification = new Notification({
  type: "FOLLOW",
  user: targetUser.User._id,
  author: currentUser._id,
});
await notification.save()
// broadcast notification to the target user
broadcast(targetUser._id, notification)



    return response({
      res,
      status: 200,
      message: "User followed",
      data: {
        targetUser,
        currentUser,
      }
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}

exports.unFollowUser = async (req, res) => {
  try {
    const { sub } = req.params;
    if (!sub || !req.body) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const { currentUserId } = req.body;
    if (!currentUserId) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const targetUser = await User.findOne({ sub });
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return response({
        res,
        status: 404,
        message: "Current User or target user not found",
      });
    }

    if (
      !currentUser.following.includes(targetUser._id) ||
      !targetUser.followers.includes(currentUserId)
    ) {
      return response({
        res,
        status: 400,
        message: "User is not following",
      });
    }

    targetUser.followers.pull(currentUserId);
    currentUser.following.pull(targetUser._id);
    await targetUser.save();
    await currentUser.save();
    // TODO add notification

    return response({
      res,
      status: 200,
      message: "User unfollowed",
      data: {
        targetUser,
        currentUser,
      },
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