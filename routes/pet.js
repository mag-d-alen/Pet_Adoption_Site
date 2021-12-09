/** @format */
const express = require('express');
const app = express();
const router = express.Router();

//protected route for adding pets
router.post('/', (req, res) => {
  const { name, type, dietaryNeeds } = req.body;
  const newPet = { name: name, type: type, dietaryNeeds: dietaryNeeds };
  res.send('protected route for adding pets');
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
