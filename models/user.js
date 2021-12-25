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
