/* eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar", _id] }] */
const express = require('express');
const mongoose = require('mongoose');

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

app.listen(PORT);
