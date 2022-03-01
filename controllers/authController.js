/** @format */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUser, signUserIn } = require('../dao/auth.js');
const { SECRET_KEY } = process.env;

const signupController = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password } = req.body;
  try {
    const user = await signUserIn(
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password
    );
    res.status(200).send(`new user: ${user.firstName} was created`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    if (!user)
      return res
        .status(403)
        .send({ error: true, message: "User doesn't exist" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(403)
        .send({ error: true, message: "Password didn't match" });
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });
    return res.send({
      message: 'Login successful',
      token: token,
      user: user,
    });
  } catch (e) {
    res.status(500).send(e.message || 'An error occured');
    return;
  }
};

module.exports = { loginController, signupController };
