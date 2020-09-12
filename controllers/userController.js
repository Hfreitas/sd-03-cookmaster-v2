const rescue = require('express-rescue');
const { Router } = require('express');
const userService = require('../services/userService');
const { userValidate, loginValidate } = require('../middlewares/authUser');

const users = Router();

users.post(
  '/users',
  userValidate,
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const registerUser = await userService.createUser(name, email, password, 'user');

    if (registerUser.message) return res.status(409).json(registerUser);
    return res.status(201).json({ user: registerUser });
  }),
);

users.post(
  '/login',
  loginValidate,
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.verifyLoginTonken(email, password);

    if (token.message) return res.status(401).json(token);

    return res.status(200).json(token);
  }),
);

module.exports = users;
