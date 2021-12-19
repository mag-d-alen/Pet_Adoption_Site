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

const { SECRET_KEY, DB_PASSWORD } = process.env;

const { MongoClient } = require('mongodb');
const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//middleware
app.use(cors());
app.use(express.json());

//create middleware to check token
// function authRequest(req, res, next) {
//   // User.find({token:req.body.token})
//   next();
//   return;
// }

// const jwt = require('jsonwebtoken');

//User.findOne(token:r)
// routes
app.use('/pet', petRoutes);
app.use('/user', userRoutes);

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password, id } =
    req.body;

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
          role: role,
          password: hashedPassword,
          id: id,
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
            await User.findOneAndUpdate(
              { id: userTobeAuthorised.id },
              { token: token }
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// module.exports = authRequest;
