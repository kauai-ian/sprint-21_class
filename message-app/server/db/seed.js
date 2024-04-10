require("dotenv").config();
const User = require("../models/User");
const Message = require("../models/Message");
const { faker } = require("@faker-js/faker");
const connect = require("./index");

const generateUsers = () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = {
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      profileImage: faker.image.avatar(),
      joinedDate: faker.date.recent({ days: 365 }),
      displayName: faker.person.fullName({ firstName, lastName }),
      sub: faker.string.uuid(),
    };
    users.push(user);
  }
  return users;
};

const generateLikes = (users) => {
  const likes = [];
  const numLikes = faker.helpers.rangeToNumber({ min: 0, max: 10 });
  if (!numLikes) return likes;

  for (let i = 0; i < numLikes; i++) {
    const user = faker.helpers.arrayElement(users);
    likes.push(user._id);
  }
  return likes;
};

const generateMessages = (users) => {
  const messages = [];
  console.log(users);
  for (let i = 0; i < 100; i++) {
    const user = faker.helpers.arrayElement(users);
    console.log("USER", user);
    const likes = generateLikes(users);
    console.log("LIKES", likes);
    const message = {
      author: user._id,
      body: faker.lorem.sentence(),
      createdDate: faker.date.recent({ days: 365 }),
      likes,
    };
    messages.push(message);
  }
  return messages;
};

const dropCollections = async () => {
  await User.collection.drop();
  await Message.collection.drop();
};

// Connect to MongoDB via Mongoose
const insertData = async () => {
  try {
    const userData = generateUsers();
    const users = await User.insertMany(userData).catch((err) =>
      console.error(err)
    );
    // console.log("USERS", users)
    const messageData = generateMessages(users);
    const messages = await Message.insertMany(messageData);
    // console.log("MESSAGES", messages)
    console.log("Seeded User collection");
  } catch (err) {
    console.error(err);
    console.log("failed to seed, exiting...");
  }
  process.exit();
};

const seed = async () => {
  await connect();
  await dropCollections();
  await insertData();
};

seed();
