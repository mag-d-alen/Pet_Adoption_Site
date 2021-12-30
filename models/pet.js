/** @format */

const mongoose = require('mongoose');
const db = require('../db/db.js');

const PetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, trim: true, unique: true, sparse: true },
  adoptionStatus: { type: String, required: true },
  picture: { type: String },
  color: { type: String, required: true },
  bio: { type: String },
  dietaryRestrictions: { type: String },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  hypoallergenic: { type: Boolean, required: true },
  dateCreated: { type: Date, default: Date.now },
  owner: { type: String },
});

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
