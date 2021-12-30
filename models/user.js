/** @format */

const mongoose = require('mongoose');
const db = require('../db/db.js');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  dateCreated: { type: Date, default: Date.now },
  savedPets: { type: Array, default: [] },
  fosteredPets: { type: Array, default: [] },
  adoptedPets: { type: Array, default: [] },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
