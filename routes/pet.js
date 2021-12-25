/** @format */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
const authenticate = require('../middleware.js');

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

//add new pet

router.post('/', authenticate, async (req, res) => {
  const pet = new Pet({
    type: req.body.newPet.type,
    name: req.body.newPet.name,
    adoptionStatus: req.body.newPet.adoptionStatus,
    picture: req.body.newPet.picture,
    height: req.body.newPet.height,
    weight: req.body.newPet.weight,
    color: req.body.newPet.color,
    bio: req.body.newPet.bio,
    hypoallergenic: req.body.newPet.hypoallergenic,
    dietaryRestrictions: req.body.newPet.dietaryRestrictions,
    breed: req.body.newPet.breed,
    owner: req.body.newPet.owner,
  });
  try {
    const petAlreadyExists = await Pet.findOne({ name: req.body.newPet.name });
    if (petAlreadyExists) {
      return res.status(400).send('Pet of this name already exists');
    } else {
      pet
        .save()
        .then((pet) => {
          res.status(200).json(`New pet: ${pet.name} was created`);
        })
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

//protected route for editing pets info
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updated = req.body.newPet;
    console.log('updated: ', updated);
    const petToUpdate = await Pet.findOneAndUpdate(
      { _id: req.params.id },
      updated
    );
    console.log('updated:', updated, req.params.id);
    petToUpdate
      .save()
      .then((pet) => {
        res.status(200).json(`${pet.name} info updated`);
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
});

//search  pets

router.get('/search', async (req, res) => {
  const { maxWeight, minWeight, maxHeight, minHeight, ...searchedPets } =
    req.query;
  try {
    const petArray = await Pet.find(searchedPets)
      .where('weight')
      .gte(minWeight)
      .lte(maxWeight)
      .where('height')
      .gte(minHeight)
      .lte(maxHeight);

    return res.send(petArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all pets
router.get('/', authenticate, async (req, res) => {
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
    const petFound = await Pet.findOne({ _id: req.params.id });
    if (!petFound) res.status(400).json('Pet not found');
    else {
      res.send(petFound);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
