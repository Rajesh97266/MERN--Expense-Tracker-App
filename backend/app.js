const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// !Database Connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Database Connected Successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

// !Middlewares
app.use(cors());
app.use(express.json());

// !Routes
app.use("/", userRouter);

//!Start Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port... ${port}`);
});
