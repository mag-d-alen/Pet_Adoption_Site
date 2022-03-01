/** @format */

const { SECRET_KEY, MONGO_URI } = process.env;
const mongoose = require('mongoose');
const url = MONGO_URI;

mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});
module.exports = db;
