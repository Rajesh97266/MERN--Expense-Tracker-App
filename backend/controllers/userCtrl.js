// !User Registration
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userController = {
  //!Register User
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //*Validate
    if (!username.trim() || !email.trim() || !password.trim()) {
      throw new Error("Please all fields are required");
    }
    //*Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    //*Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //*Create the user and save into db
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //*Send the response
    res.status(201).json({
      message: "User created successfully",
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),
  // !Login user
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //* Validate input fields (no empty values)
    if (!email?.trim() || !password?.trim()) {
      throw new Error("All fields are required");
    }
    //!*Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    //* Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    // * Create the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //* Send the response
    res.status(200).json({
      message: "User logged in successfully!!!",
      username: user.username,
      email: user.email,
      id: user._id,
      token,
    });
  }),
  // !Profile
  profile: asyncHandler(async (req, res) => {
    //*Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //*Send the response
    res.json({ username: user.username, email: user.email });
  }),
  //!Change password
  changePassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //*Get the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //*Hash the new password before saving
    //*Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //*Save the new password
    user.password = hashedPassword;
    await user.save({
      validateBeforeSave: false,
    });
    //!Send the response
    res.json({ message: "Password changed successfully" });
  }),
  //! update user profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

module.exports = userController;
