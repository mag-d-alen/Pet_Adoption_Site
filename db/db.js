/** @format */
require('dotenv').config();
const mongoose = require('mongoose');
const DB_PASSWORD = process.env.DB_PASSWORD;
const { MongoClient } = require('mongodb');
const url =
  'mongodb+srv://Mag:MiShuf1607@cluster0.norka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

module.exports = db;
