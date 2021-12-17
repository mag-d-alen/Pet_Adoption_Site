/** @format */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
//protected route for adding pets
const { MongoClient } = require('mongodb');
const Pet = require('../models/Pet');
const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

router.use(express.json());
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

router.post('/', async (req, res) => {
  const pet = new Pet({
    id: req.body.id,
    type: req.body.type,
    name: req.body.name,
    adoptionStatus: req.body.adoptionStatus,
    picture: req.body.picture,
    height: req.body.height,
    weight: req.body.weight,
    color: req.body.color,
    bio: req.body.bio,
    hypoallergenic: req.body.hypoallergenic,
    dietaryRestrictions: req.body.dietaryRestrictions,
    breed: req.body.breed,
  });
  try {
    const petAlreadyExist = await Pet.findOne({ id: req.body.id });
    pet
      .save()
      .then((pet) => {
        res.status(200).json(`new pet: ${pet.name} was created`);
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

//protected route for editing pets info
router.put('/:id', async (req, res) => {
  try {
    const updated = { ...req.body, id: req.params.id };
    const petToUpdate = await Pet.findOneAndUpdate(
      { id: req.params.id },
      updated
    );
    petToUpdate
      .save()
      .then((pet) => {
        res.status(200).json(`${pet.name} info updated`);
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get searched pets
router.get('/search', async (req, res) => {
  try {
    const petArray = await Pet.find(JSON.parse(req.query.searchedPets));
    res.send(petArray);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get all
router.get('/', async (req, res) => {
  try {
    const petArray = await Pet.find();
    res.send(petArray);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get pet by id
router.get('/:id', async (req, res) => {
  try {
    const petFound = await Pet.findOne({ id: req.params.id });
    if (!petFound) res.status(400).json('Pet not found');
    else {
      console.log(petFound);
      res.send(petFound);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//logged users only
router.post('/:id/adopt', (req, res) => {
  res.send(`adopt ${req.params.id}`);
});

router.get('/user/:id', (req, res) => {
  res.send('pets owned by a specific user');
});

router.delete('/:id/save', (req, res) => {
  res.send('remove saved pet');
});

module.exports = router;
