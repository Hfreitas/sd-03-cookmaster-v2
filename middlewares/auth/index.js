const jwt = require('jsonwebtoken');

const services = require('../../services');
const { tokenKey } = require('../login/loginConfig');
const { generateError } = require('../../utils');

const validateTokenInfo = async (token, required) => {
  try {
    const decodedInfo = jwt.verify(token, tokenKey);
    const { _id } = decodedInfo.data;

    const userData = await services.SearchUser(null, _id);

    if (!required) return;

    if (!userData) throw new Error('invalid token');

    if (required && !token) throw new Error('invalid token');

    return { ...userData };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = (required = true) => async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const validateInfo = await validateTokenInfo(authorization, required);

    if (!required) return next();

    req.user = validateInfo;

    return next();
  } catch (error) {
    return next(generateError(401, error));
  }
};
