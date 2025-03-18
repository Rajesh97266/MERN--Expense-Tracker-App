// !User Registration
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userController = {
  //!Register User
  register: asyncHandler(async (req, res) => {
    res.json({ message: "Register User" });
  }),
};

module.exports = userController;
