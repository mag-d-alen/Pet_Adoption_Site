/** @format */

const bcrypt = require('bcrypt');

const {
  editUserSettings,
  getAllUsers,
  savePet,
  unsavePet,
  fosterPet,
  returnPet,
  adoptPet,
  showSaved,
  showAdopted,
  showFostered,
} = require('../dao/user.js');

const editUserSettingsController = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body.newUser;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      bio: data.bio,
    };

    const updatedUser = await editUserSettings(id, user);
    return res.status(200).send({
      msg: 'Your data was successfully updated',
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const savePetController = async (req, res) => {
  try {
    const userId = req.params.id;
    const petId = req.body.id;
    const updatedUser = await savePet(userId, petId);
    return res.status(200).send({
      user: updatedUser,
      msg: `You saved me for later :)`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const unsavePetController = async (req, res) => {
  try {
    const petId = req.body.id;
    const userId = req.params.id;
    const updatedUser = await unsavePet(userId, petId);
    return res.status(200).send({
      user: updatedUser,
      msg: ` hi, ${updatedUser.firstName}  you removed me from your saved pets`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const fosterPetController = async (req, res) => {
  try {
    const petId = req.body.id;
    const userId = req.params.id;
    const fosteredSuccess = await fosterPet(userId, petId);

    return res.status(200).send({
      user: fosteredSuccess.updatedUser,
      pet: fosteredSuccess.updatedPet,
      msg: `${fosteredSuccess.updatedPet.name} is now fostered by ${fosteredSuccess.updatedUser.firstName}!`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const returnPetController = async (req, res) => {
  try {
    const petId = req.body.id;
    const userId = req.params.id;
    const success = await returnPet(userId, petId);
    return res.status(200).send({
      user: success.updatedUser,
      pet: success.updatedPet,
      msg: ` ${success.updatedUser.firstName} has returned ${success.updatedPet.name}`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const adoptPetController = async (req, res) => {
  try {
    const petId = req.body.id;
    const userId = req.params.id;
    const success = await adoptPet(userId, petId);
    res.status(200).send({
      user: success.updatedUser,
      pet: success.updatedPet,
      msg: `${success.updatedPet.name} has been adopted by ${success.updatedUser.firstName}!`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const showFosteredController = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await showFostered(userId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const showAdoptedController = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await showAdopted(userId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const showSavedController = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await showSaved(userId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  editUserSettingsController,
  getAllUsersController,
  savePetController,
  unsavePetController,
  fosterPetController,
  returnPetController,
  adoptPetController,
  showFosteredController,
  showSavedController,
  showAdoptedController,
};
