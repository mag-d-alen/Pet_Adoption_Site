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
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
