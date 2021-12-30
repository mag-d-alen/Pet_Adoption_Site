/** @format */

const Pet = require('../models/Pet');

const addPet = async (pet) => {
  try {
    const petAlreadyExists = await Pet.findOne({ name: pet.name });
    if (petAlreadyExists) {
      return 'Pet of this name already exists';
    } else {
      const newPet = new Pet(pet);
      newPet.save().then((pet) => {
        return `New pet: ${pet.name} was created`;
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const editPet = async (newPet, id) => {
  try {
    const petToUpdate = await Pet.findOneAndUpdate({ _id: id }, newPet, {
      new: true,
    });
    petToUpdate.save();
    return petToUpdate;
  } catch (error) {
    return res.status(500).json(error);
  }
};

const searchPet = async (
  maxWeight,
  minWeight,
  maxHeight,
  minHeight,
  searchedPets
) => {
  try {
    const petArray = await Pet.find(searchedPets)
      .where('weight')
      .gte(minWeight)
      .lte(maxWeight)
      .where('height')
      .gte(minHeight)
      .lte(maxHeight);

    return petArray;
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllPets = async () => {
  try {
    const petArray = await Pet.find();
    return petArray;
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPet = async (id) => {
  try {
    const petFound = await Pet.findOne({ _id: id });
    if (!petFound) return res.status(400).json('Pet not found');
    else {
      return petFound;
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPetName = async (id) => {
  try {
    const petFound = await Pet.findOne({ _id: id }).select('name -_id');
    if (!petFound) res.status(400).send('Pet not found');
    else {
      return petFound.name;
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  editPet,
  searchPet,
  getAllPets,
  getPet,
  getPetName,
  addPet,
};
