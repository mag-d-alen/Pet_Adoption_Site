/** @format */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
// const { MongoClient } = require('mongodb');
// const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const User = require('../models/User');

//protected route for editing user settings
router.put('/:id', (req, res) => {
  res.send('data updated');
});

// mongoose.connect(url);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Connection Successful!');
// });

router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;

    res.setHeader('content-type', 'aplication/json');
    //  res.send(JSON.stringify(user));
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//admin only

router.get('/:id/full', (req, res) => {
  res.send(req.params.id);
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
