/** @format */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;

//protected route for adding pets

const { MongoClient } = require('mongodb');
const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

const PetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, trim: true, index: true, unique: true, sparse: true },
  adoptionStatus: { type: String, required: true },
  picture: { type: String, required: true },
  color: { type: String, required: true },
  bio: { type: String, required: true },
  dietaryRestrictions: { type: String, required: true },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  hypoallergenic: { type: Boolean, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Pet = mongoose.model('Pet', PetSchema);

router.post('/', async (req, res) => {
  const {
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = req.body;
  const pet = new Pet({
    type: type,
    name: name,
    adoptionStatus: adoptionStatus,
    picture: picture,
    height: height,
    weight: weight,
    color: color,
    bio: bio,
    hypoallergenic: hypoallergenic,
    dietaryRestrictions: dietaryRestrictions,
    breed: breed,
  });
  try {
    const petAlreadyExist = await Pet.findOne({ name: name });
    if (petAlreadyExist) {
      res.status(400).json('pet of this name already exists');
    } else {
      pet
        .save()
        .then((pet) => {
          res.status(200).json(`new pet: ${pet.name} was created`);
        })
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//protected route for editing pets info
router.put('/:id', (req, res) => {
  res.send('pet updated');
});

//display all pets
router.get('/', (req, res) => {
  res.send('here will be new pets with photo and stuff');
});
//get pet by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(id);
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
