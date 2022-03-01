/** @format */

const User = require('../models/User');
const Pet = require('../models/Pet');

//protected route for editing user settings

const editUserSettings = async (id, user) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });
    updatedUser.save();
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const savePet = async (userId, petId) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { savedPets: petId } },
      { new: true }
    );
    updatedUser.save();
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const unsavePet = async (userId, petId) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { savedPets: petId } },
      { new: true }
    );
    updatedUser.save();
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const fosterPet = async (userId, petId) => {
  try {
    const alreadyFostered = await User.findOne({
      _id: userId,
      fosteredPets: { $in: [petId] },
    });

    if (alreadyFostered) {
      return res
        .status(400)
        .send({ msg: 'You are alerady fostering this pet' });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { fosteredPets: petId } },
      { new: true }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: petId },
      { owner: userId, adoptionStatus: 'fostered' },
      { new: true }
    );
    updatedPet.save();
    return { updatedUser: updatedUser, updatedPet: updatedPet };
  } catch (error) {
    console.log(error);
  }
};

const returnPet = async (userId, petId) => {
  try {
    const notFostered = await User.findOne({
      _id: userId,
      fosteredPets: { $nin: [petId] },
    });

    if (notFostered) {
      return res.status(400).send({ msg: 'You are not fostering this pet' });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { fosteredPets: petId } },
      { new: true }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: petId },
      { owner: '', adoptionStatus: 'available' },
      { new: true }
    );
    updatedPet.save();
    return { updatedUser: updatedUser, updatedPet: updatedPet };
  } catch (error) {
    console.log(error);
  }
};

const adoptPet = async (userId, petId) => {
  try {
    const alreadyAdopted = await User.findOne({
      _id: userId,
      adoptedPets: { $in: [petId] },
    });

    if (alreadyAdopted) {
      throw new Error('You have already adopted this pet');
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { adoptedPets: petId } },
      { new: true }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: petId },
      { owner: userId, adoptionStatus: 'adopted' }
    );
    updatedPet.save();

    return { updatedUser: updatedUser, updatedPet: updatedPet };
  } catch (error) {
    console.log(error);
  }
};
const showFostered = async (id) => {
  try {
    const data = await User.find({ _id: id });
    if (data) return data[0].fosteredPets;
    else {
      throw new Error('no pets found');
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
const showAdopted = async (id) => {
  try {
    const data = await User.find({ _id: id });
    if (data) return data[0].adoptedPets;
    else {
      throw new Error('no pets found');
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
const showSaved = async (id) => {
  try {
    const data = await User.find({ _id: id });

    if (data) return data[0].savedPets;
    else {
      throw new Error('no pets found');
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  editUserSettings,
  getAllUsers,
  savePet,
  unsavePet,
  fosterPet,
  returnPet,
  adoptPet,
  showFostered,
  showAdopted,
  showSaved,
};
