const jwt = require('jsonwebtoken');
const { verifyConst } = require('../utils/const');

// module.exports = (req, res, next) => {
//   // тут будет вся авторизация
//   const { authorization } = req.headers;
//   console.log(authorization);
//   console.log(req.headers);
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизацияh' });
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     // попытаемся верифицировать токен
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     // отправим ошибку, если не получилось
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация' });
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
//   return req.user;
// };

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  // const { Authorization } = req.headers;
  const authorization = req.headers.cookie;
  if (!authorization) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('jwt=', '');
  // const token = authorization;
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, verifyConst);
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизацияz' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
  return req.user;
};
