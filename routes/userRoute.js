/** @format */

const { authenticate } = require('../middleware.js');
const router = require('express').Router();
const {
  editUserSettingsController,
  getAllUsersController,
  savePetController,
  unsavePetController,
  fosterPetController,
  returnPetController,
  adoptPetController,
  showFosteredController,
  showAdoptedController,
  showSavedController,
} = require('../controllers/userController');

//edit pet info

router.put('/', authenticate, editUserSettingsController);
router.get('/', authenticate, getAllUsersController);
router.post('/:id/save', authenticate, savePetController);
router.post('/:id/unsave', authenticate, unsavePetController);
router.post('/:id/foster', authenticate, fosterPetController);
router.post('/:id/return', authenticate, returnPetController);
router.post('/:id/adopt', authenticate, adoptPetController);
router.get('/:id/fostered', authenticate, showFosteredController);
router.get('/:id/adopted', authenticate, showAdoptedController);
router.get('/:id/saved', authenticate, showSavedController);

module.exports = router;
