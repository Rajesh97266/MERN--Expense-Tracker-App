// !User Registration
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userController = {
  //!Register User
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //!Validate
    if (!username.trim() || !email.trim() || !password.trim()) {
      throw new Error("Please all fields are required");
    }
    //!Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
     throw new Error("User already exists");
    }
    //!Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //! Create the user and save into db
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //! Send the response
    res.status(201).json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
      message: "User created successfully",
    });
  }),
  // !Login user
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //! Validate input fields (no empty values)
    if (!email?.trim() || !password?.trim()) {
      throw new Error("All fields are required");
    }
    //! Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
       throw new Error("Invalid login credentials");
    }
    //! Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       throw new Error("Invalid login credentials");
    }
    // ! Create the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //! Send the response
    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      token,
      message: "User logged in successfully",
    });
  }),
};

module.exports = userController;
