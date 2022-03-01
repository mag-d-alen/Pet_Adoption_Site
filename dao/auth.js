/** @format */

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  SECRET_KEY,
  MONGO_URI,
  IMAGEKIT_ENDPOINT,
  IMAGEKIT_PUBLICKEY,
  IMAGEKIT_PRIVATEKEY,
} = process.env;

const signUserIn = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  role,
  password
) => {
  try {
    const userAlreadyExist = await User.findOne({ email: email });
    if (!userAlreadyExist) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          role: undefined,
          adoptedPets: undefined,
          fosteredPets: undefined,
          savedPets: undefined,
        });
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error('Authorisation failed, user already exists');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

/** @format */

const getUser = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, signUserIn };
