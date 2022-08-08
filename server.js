/** @format */

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const petRoutes = require("./routes/petRoute");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const { imageMiddleware } = require("./middleware");

const User = require("./models/User");
const ImageKit = require("imagekit");

const {
  PORT,
  SECRET_KEY,
  MONGO_URI,
  IMAGEKIT_ENDPOINT,
  IMAGEKIT_PUBLICKEY,
  IMAGEKIT_PRIVATEKEY,
} = process.env;
console.log(MONGO_URI);
const { MongoClient } = require("mongodb");
const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_ENDPOINT,
  publicKey: IMAGEKIT_PUBLICKEY,
  privateKey: IMAGEKIT_PRIVATEKEY,
});

const url = MONGO_URI;
//middleware
app.use(cors());
app.use(express.json());
app.use("/pet", petRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});
app.get("/auth", imageMiddleware, (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
// module.exports = authRequest;
