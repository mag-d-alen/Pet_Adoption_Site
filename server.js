/** @format */

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;
const petRoutes = require('./routes/pet');
const userRoutes = require('./routes/user');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const ImageKit = require('imagekit');

const { SECRET_KEY, DB_PASSWORD } = process.env;

const { MongoClient } = require('mongodb');
const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/idfq3nty6jr/',
  publicKey: 'public_2jIz52z8w7n/jiO/gw6VCXTS/ic=',
  privateKey: 'private_nhR3Eg+R0dvFVZvU1cL+Tt6ZQkY=',
});

//middleware
app.use(cors());
app.use(express.json());

app.use('/pet', petRoutes);
app.use('/user', userRoutes);

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password } = req.body;
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
        user.save().then((user) => {
          res.status(200).json(`new user: ${user.firstName} was created`);
        });
      } catch (error) {
        res.status(400).send('Authorisation failed, try again');
      }
    } else {
      throw new Error('Authorisation failed, user already exists');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userTobeAuthorised = await User.findOne({ email: email });
    if (!userTobeAuthorised) {
      return res.status(400).send('Authorisation failed');
    } else {
      bcrypt.compare(
        password,
        userTobeAuthorised.password,
        async (error, result) => {
          if (result) {
            const token = jwt.sign(
              { email: userTobeAuthorised.email },
              SECRET_KEY,
              { expiresIn: '1h' }
            );

            return res.status(200).json({
              message: 'Login successful',
              token: token,
              user: userTobeAuthorised,
            });
          } else if (error) {
            return res.status(400).send('Authorisation failed');
          } else {
            return res.status(400).send("Passwords don't match");
            console.log("passwords don't match");
          }
        }
      );
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get(
  '/auth',
  function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  },
  (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  }
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// module.exports = authRequest;
