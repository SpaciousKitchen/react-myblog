const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { verifyToken } = require('./auth');

router.post('/login', async (req, res) => {
  const findResult = await User.findOne({
    where: { loginId: req.body.loginId },
  });
  if (!findResult) {
    const createResult = await User.create({
      loginId: req.body.loginId,
      name: req.body.name,
      email: req.body.email,
      img: req.body.img,
      logoUrl: req.body.logoUrl,
      option: req.body.option,
    });

    jwt.sign({ user: createResult }, process.env.SECRET_KEY, (err, token) => {
      return res.status(201).send({ user: createResult, token });
    });
  } else {
    jwt.sign({ user: findResult }, process.env.SECRET_KEY, (err, token) => {
      return res.status(201).send({ user: findResult, token });
    });
  }
});

router.post('/logout', verifyToken, (req, res) => {
  req.headers.authorization = null;
  return res.status(201).send();
});

module.exports = router;
