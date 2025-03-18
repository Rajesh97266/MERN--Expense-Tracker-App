const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userCtrl");

// !Register User
userRouter.post("/api/v1/users/register" , userController.register)

module.exports = userRouter