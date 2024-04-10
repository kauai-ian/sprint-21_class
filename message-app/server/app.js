require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { missingRouteHandler, errorHandler } = require("./middleware/errors");

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("Connected to MongoDB");
    return db;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// catch 404 and forward to error handler
app.use(missingRouteHandler);
// error handler
app.use(errorHandler);

module.exports = app;
