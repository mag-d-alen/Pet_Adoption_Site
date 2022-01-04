/** @format */
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  const token = req.body.token || req.query.token || req.query[0];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}

function imageMiddleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}

module.exports = { authenticate, imageMiddleware };
