/** @format */
const { SECRET_KEY, DB_PASSWORD } = process.env;
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://Mag:${DB_PASSWORD}@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

const PetSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true, index: true, required: true },
  type: { type: String, required: true },
  name: { type: String, trim: true },
  adoptionStatus: { type: String, required: true },
  picture: { type: String },
  color: { type: String, required: true },
  bio: { type: String, required: true },
  dietaryRestrictions: { type: String, required: true },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  hypoallergenic: { type: Boolean, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
