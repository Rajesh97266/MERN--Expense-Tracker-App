const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userCtrl");

// !Register User
userRouter.post("/api/v1/users/register" , userController.register)
//!Login user
userRouter.post("/api/v1/users/login", userController.login)

module.exports = userRouter