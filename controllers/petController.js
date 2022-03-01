/** @format */

const {
  editPet,
  searchPet,
  petArray,
  getAllPets,
  getPet,
  getPetName,
  addPet,
} = require('../dao/pet.js');

const addPetController = async (req, res) => {
  const pet = {
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
  };
  try {
    const result = await addPet(pet);
    return res.status(200).send(`New pet: ${pet.name} was created`);
  } catch (error) {
    res.status(400).send(error);
  }
};

//updates pet info: auth req.body,newpet
const editPetController = async (req, res) => {
  try {
    const updated = req.body.newPet;
    const id = req.params.id;
    const updatedPet = await editPet(updated, id);
    return res.send({ msg: `${updated.name} info updated`, pet: updatedPet });
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchPetsController = async (req, res) => {
  console.log(req.query);
  try {
    const { maxWeight, minWeight, maxHeight, minHeight, ...searchedPets } =
      req.query;
    const petArray = await searchPet(
      maxWeight,
      minWeight,
      maxHeight,
      minHeight,
      searchedPets
    );
    return res.status(200).send(petArray);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllPetsController = async (req, res) => {
  try {
    const petArray = await getAllPets();
    return res.status(200).send(petArray);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPetController = async (req, res) => {
  try {
    const id = req.params.id;
    const petFound = await getPet(id);
    return res.status(200).send(petFound);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPetNameController = async (req, res) => {
  try {
    const id = req.params.id;
    const petName = await getPetName(id);
    return res.status(200).send(petName);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  editPetController,
  searchPetsController,
  getAllPetsController,
  getPetController,
  getPetNameController,
  addPetController,
};
