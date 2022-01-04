/** @format */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
const { authenticate } = require('../middleware.js');

app.use(express.json());

const User = require('../models/User');
const Pet = require('../models/Pet');
const bcrypt = require('bcrypt');

//protected route for editing user settings

// router.put('/', authenticate, async (req, res) => {
//   try {
//     const data = req.body.newUser;
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const user = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       phoneNumber: data.phoneNumber,
//       password: hashedPassword,
//       bio: data.bio,
//     };
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.body.id },
//       user,
//       {
//         new: true,
//       }
//     );
//     updatedUser.save();
//     res.status(200).send({
//       msg: 'Your data was successfully updated',
//       updatedUser: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //admin only

// router.get('/:id/full', (req, res) => {
//   res.send(req.params.id);
// });

//saving a pet

// router.post('/:id/save', authenticate, async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { savedPets: req.body.id } }
//     );
//     updatedUser.save().then((user) => {
//       res.status(200).json('pet data saved successfully');
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get('/', authenticate, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

// router.post('/:id/save', authenticate, async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { savedPets: req.body.id } },
//       { new: true }
//     );

//     updatedUser.save().then((user) => {
//       res.status(200).send({
//         user: updatedUser,
//         msg: `You saved me for later :)`,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //fostering a pet// this will be in user controlers
// router.post('/:id/foster', authenticate, async (req, res) => {
//   const petId = req.body.id;
//   const userId = req.params.id;
//   try {
//     const alreadyFostered = await User.findOne({
//       _id: userId,
//       fosteredPets: { $in: [petId] },
//     });

//     if (alreadyFostered) {
//       return res
//         .status(400)
//         .send({ msg: 'You are alerady fostering this pet' });
//     }
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $push: { fosteredPets: petId } },
//       { new: true }
//     );
//     updatedUser.save();
//     const updatedPet = await Pet.findOneAndUpdate(
//       { _id: petId },
//       { owner: userId, adoptionStatus: 'fostered' },
//       { new: true }
//     );
//     updatedPet.save().then((pet) => {
//       res.status(200).send({
//         user: updatedUser,
//         pet: updatedPet,
//         msg: `${pet.name} is now fostered by ${updatedUser.firstName}!`,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// });

// //adopting a pet
// router.post('/:id/adopt', authenticate, async (req, res) => {
//   const petId = req.body.id;
//   const userId = req.params.id;
//   try {
//     const alreadyAdopted = await User.findOne({
//       _id: userId,
//       AdoptedPets: { $in: [petId] },
//     });

//     if (alreadyAdopted) {
//       return res
//         .status(400)
//         .send({ msg: 'You are alerady fostering this pet' });
//     }
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $push: { adoptedPets: petId } },
//       { new: true }
//     );
//     updatedUser.save();
//     const updatedPet = await Pet.findOneAndUpdate(
//       { _id: petId },
//       { owner: userId, adoptionStatus: 'adopted' }
//     );
//     updatedPet.save().then((pet) => {
//       res.status(200).send({
//         user: updatedUser,
//         pet: updatedPet,
//         msg: `${pet.name} has been adopted by ${updatedUser.firstName}!`,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post('/:id/return', authenticate, async (req, res) => {
//   const petId = req.body.id;
//   const userId = req.params.id;
//   try {
//     const notFostered = await User.findOne({
//       _id: userId,
//       fosteredPets: { $nin: [petId] },
//     });

//     if (notFostered) {
//       return res.status(400).send({ msg: 'You are not fostering this pet' });
//     }
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $pull: { fosteredPets: petId } },
//       { new: true }
//     );
//     updatedUser.save();
//     const updatedPet = await Pet.findOneAndUpdate(
//       { _id: petId },
//       { owner: '', adoptionStatus: 'available' },
//       { new: true }
//     );
//     updatedPet.save().then((pet) => {
//       res.status(200).send({
//         user: updatedUser,
//         pet: updatedPet,
//         msg: ` ${updatedUser.firstName} has returned ${pet.name}`,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post('/:id/unsave', authenticate, async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       { $pull: { savedPets: req.body.id } },
//       { new: true }
//     );

//     updatedUser.save().then((pet) => {
//       res.status(200).send({
//         user: updatedUser,
//         msg: ` hi, ${updatedUser.firstName}  you removed me from your saved pets`,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//displaying if pet is saved
router.get('/:id/saved', authenticate, async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id });

    res.send(data[0].savedPets);
  } catch (error) {}
});

//displaying if pet is adopted

router.get('/:id/adopted', authenticate, async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id });
    res.send(data[0].adoptedPets);
  } catch (error) {
    console.log(error);
  }
});

//displaying  fostered  pets of a given user

router.get('/:id/fostered', authenticate, async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id });
    return res.send(data[0].fosteredPets);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
