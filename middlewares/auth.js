const jwt = require('jsonwebtoken');
const { verifyConst } = require('../utils/const');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;
  if (!authorization || !authorization.startsWith('jwt')) {
    throw new Unauthorized('Необходима авторизация');
  }
  const token = authorization.replace('jwt=', '');
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
