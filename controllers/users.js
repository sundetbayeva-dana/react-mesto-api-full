const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { verifyConst } = require('../utils/const');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      const newUser = User.create({
        name, about, avatar, email, password: hash,
      });
      return newUser;
    })
    .then((newUser) => res.status(200).send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Conflict('При регистрации указан email, который уже существует на сервере');
      }
      throw new BadRequest('Переданы некорректные данные в метод создания пользователя');
    })
    .catch(next);
};

// const createUser = (req, res, next) => {
//   const {
//     name, about, avatar, email, password,
//   } = req.body;
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         throw new Conflict('При регистрации указан email, который уже существует на сервере');
//       }
//       bcrypt.hash(password, 10)
//         .then((hash) => {
//           const newUser = User.create({
//             name, about, avatar, email, password: hash,
//           });
//           return newUser;
//         })
//         .then((newUser) => res.status(200).send({ data: newUser }))
//         .catch(() => {
//           throw new BadRequest('Переданы некорректные данные в метод создания пользователя');
//         })
//         .catch(next);
//     })
//     .catch(next);
// };

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: updatedAvatar });
    })
    .catch(() => {
      throw new BadRequest('Переданы некорректные данные в метод обновления аватара пользователя');
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(() => {
      throw new BadRequest('Переданы некорректные данные в метод обновления профиля пользователя');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, verifyConst, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(() => {
      throw new Unauthorized('Неправильные почта или пароль');
    })
    .catch(next);
};

const getUserInformation = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateAvatar,
  updateUser,
  login,
  getUserInformation,
};
