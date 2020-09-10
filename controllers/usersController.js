const rescue = require('express-rescue');
const ErrorClass = require('../utils/ErrorClass');
const {
  insertCommonUser,
  validateName,
  validatePassword,
  validateUserEmail,
  validateUniqueEmail,
} = require('../services/userServices');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const nameIsValid = validateName(name);
  const passwordIsValid = validatePassword(password);
  const emailIsValid = validateUserEmail(email);
  const uniqueEmail = await validateUniqueEmail(email);

  if (nameIsValid || passwordIsValid || emailIsValid) {
    const errorMessage = nameIsValid || passwordIsValid || emailIsValid;
    throw new ErrorClass(400, errorMessage, 'invalid_data');
  }

  if (uniqueEmail) throw new ErrorClass(409, uniqueEmail, 'not_unique_email');

  const user = await insertCommonUser({ name, email, password, role: 'user' });

  return res.status(201).json({ user });
});

module.exports = {
  createUser,
};
