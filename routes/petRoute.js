/** @format */

const { authenticate } = require('../middleware.js');
const router = require('express').Router();
const {
  editPetController,
  searchPetsController,
  getAllPetsController,
  getPetController,
  addPetController,
  getPetNameController,
} = require('../controllers/petController');

//edit pet info

router.put('/:id', authenticate, editPetController);
router.post('/', authenticate, addPetController);
router.get('/search', searchPetsController);
router.get('/', authenticate, getAllPetsController);
router.get('/:id', getPetController);
router.get('/:id/name', authenticate, getPetNameController);

module.exports = router;
