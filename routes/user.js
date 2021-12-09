/** @format */
const express = require('express');
const app = express();
const router = express.Router();

//protected route for editing user settings
router.put('/:id', (req, res) => {
  res.send('data updated');
});

//get user by id
router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;

    res.setHeader('content-type', 'aplication/json');
    res.send(JSON.stringify(user));
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//admin only

router.get('/:id/full', (req, res) => {
  res.send(req.params.id);
});

router.get('/', async (req, res) => {
  //const users = await db.findAll(User)
  res.send('protected route for adnmin. returns all users');
});

module.exports = router;
