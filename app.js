const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND_CODE } = require('./utils/const');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getOwner = (req, res, next) => {
  req.user = {
    _id: '61a91cdecd0a53e466be3766',
  };
  next();
};

app.use(getOwner);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Запрос несуществующей страницы' });
});

app.listen(PORT);
