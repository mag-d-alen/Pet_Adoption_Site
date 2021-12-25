/** @format */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const { SECRET_KEY, DB_PASSWORD } = process.env;
const cors = require('cors');
const authenticate = require('../middleware.js');

app.use(express.json());

const User = require('../models/User');
const Pet = require('../models/Pet');

//protected route for editing user settings
// router.put('/:id', authenticate, (req, res) => {
//   res.send('data updated');
// });

// router.get('/:userId', authenticate, (req, res) => {
//   try {
//     const userId = req.query;

//     res.setHeader('content-type', 'aplication/json');
//     //  res.send(JSON.stringify(user));
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

// //admin only

// router.get('/:id/full', (req, res) => {
//   res.send(req.params.id);
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

router.post('/:id/save', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { savedPets: req.body.id } }
    );

    updatedUser.save().then((user) => {
      res.status(200).send({
        user: updatedUser,
        msg: `You saved me for later :)`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//fostering a pet
router.post('/:id/foster', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { fosteredPets: req.body.id } }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: req.body.id },
      { owner: req.params.id, adoptionStatus: 'fostered' }
    );
    updatedPet.save().then((pet) => {
      res.status(200).send({
        user: updatedUser,
        msg: `${pet.name} is now fostered by ${updatedUser.firstName}!`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//adopting a pet
router.post('/:id/adopt', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { adoptedPets: req.body.id } }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: req.body.id },
      { owner: req.params.id, adoptionStatus: 'adopted' }
    );
    updatedPet.save().then((pet) => {
      res.status(200).send({
        user: updatedUser,
        msg: `${pet.name} has been adopted by ${updatedUser.firstName}!`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/return', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { fosteredPets: req.body.id } }
    );
    updatedUser.save();
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: req.body.id },
      { owner: '', adoptionStatus: 'available' }
    );
    updatedPet.save().then((pet) => {
      res.status(200).send({
        user: updatedUser,
        msg: ` ${updatedUser.firstName} has returned ${pet.name}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/unsave', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { savedPets: req.body.id } }
    );
    updatedUser.save().then((pet) => {
      res.status(200).send({
        user: updatedUser,
        msg: ` hi, ${updatedUser.firstName}  you removed me from your saved pets`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

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

//displaying if pet is fostered

router.get('/:id/fostered', authenticate, async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id });
    res.send(data[0].fosteredPets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
