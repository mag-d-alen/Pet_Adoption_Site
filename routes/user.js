/** @format */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
app.use(express.json());

const User = require('../models/User');

//protected route for editing user settings
router.put('/:id', (req, res) => {
  res.send('data updated');
});

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

router.post('/:id/save', async (req, res) => {
  try {
    const savedPet = { id: req.body.id };
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      { $push: { savedPets: savedPet } }
    );
    updatedUser.save().then((user) => {
      res.status(200).json('pet data saved successfully');
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/foster', async (req, res) => {
  try {
    const fosteredPet = { id: req.body.id };
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      { $push: { fosteredPets: fosteredPet } }
    );
    updatedUser.save().then((user) => {
      res.status(200).json('Congratulations on fostering your pet!');
    });
  } catch (error) {
    console.log(error);
  }
});
router.post('/:id/adopt', async (req, res) => {
  try {
    const adoptedPet = { id: req.body.id };
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      { $push: { adoptedPets: adoptedPet } }
    );
    updatedUser.save().then((user) => {
      res.status(200).json('Congratulations on adopting your pet!');
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:id', (req, res) => {
  res.send('pets owned by a specific user');
});

router.delete('/:id/save', (req, res) => {
  res.send('remove saved pet');
});

module.exports = router;
