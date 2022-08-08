/** @format */

const dotenv = require("dotenv");
dotenv.config();
const router = require("express").Router();
const { imageMiddleware } = require("../middleware");
const ImageKit = require("imagekit");
const { IMAGEKIT_ENDPOINT, IMAGEKIT_PUBLICKEY, IMAGEKIT_PRIVATEKEY } =
  process.env;
const {
  loginController,
  signupController,
} = require("../controllers/authController.js");


const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_ENDPOINT,
  publicKey: IMAGEKIT_PUBLICKEY,
  privateKey: IMAGEKIT_PRIVATEKEY,
});
router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/", imageMiddleware, (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

module.exports = router;
