const jwt = require('jsonwebtoken');
const { verifyConst } = require('../utils/const');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, verifyConst);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  next();
  return req.user;
};
