/** @format */
const User = require('./models/User');
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '');
  const isAuth = await User.findOne({ token: token });
  if (!isAuth) {
    res.status(401).send({ message: 'Must authenticate' });
    return;
  }
  next();
  // });
}

module.exports = authenticate;
