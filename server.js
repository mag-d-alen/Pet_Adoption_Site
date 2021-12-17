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

// routes
app.use('/pet', petRoutes);
app.use('/user', userRoutes);

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password, id } =
    req.body;

  try {
    const userAlreadyExist = await User.findOne({ email: email });
    if (userAlreadyExist) {
      res.status(400).json('Authorisation failed, user already exists');
    } else {
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
      console.log(user);
      user
        .save()
        .then((user) => {
          res.status(200).json(`new user: ${user.firstName} was created`);
        })
        .catch((error) => res.status(500).json({ error }));
      res.send(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userTobeAuthorised = await User.findOne({ email: email });
    if (!userTobeAuthorised) {
      console.log('authorisation failed');
      res.status(400).json('Authorisation failed');
    } else {
      bcrypt.compare(password, userTobeAuthorised.password, (error, result) => {
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
          res.status(400).json('authorisation failed');
          console.log('authorisation failed');
        } else {
          res.status(400).json("passwords don't match");
          console.log("passwords don't match");
        }
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
