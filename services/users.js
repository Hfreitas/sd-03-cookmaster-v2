const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { badRequest, conflict, unauthorized } = require('../MyErrors');

const secret = 'seusecretdetoken';
const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const setNewUser = async (name, email, password) => {
  if (!name || !email || !emailRegx.test(email) || !password) return badRequest('Invalid entries. Try again.');
  const valid = await users.findUserByEmail(email);
  if (valid !== null) return conflict('Email already registered');
  const infos = await users.setNewUser(name, email, password);
  return infos;
};

const findUser = async (email, password) => {
  if (!email || !password) return unauthorized('All fields must be filled');
  const user = await users.findUserByEmail(email);
  if (user === null) return unauthorized('Incorrect username or password');
  if (user.user.password !== password) return unauthorized('Incorrect username or password');
  const jwtConfig = {
    expiresIn: '1m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = {
  setNewUser,
  findUser,
};
