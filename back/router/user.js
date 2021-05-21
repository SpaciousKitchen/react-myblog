const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { verifyToken } = require('./auth');

router.get('/loadUserInfo', verifyToken, async (req, res) => {
  if (req.userId) {
    try {
      const findResult = await User.findOne({
        where: { id: req.userId },
        attribute: { exclude: ['updatedAt'] },
      });
      return res.status(201).send({ user: findResult, token: req.token });
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(201).send({ user: null });
  }
});

router.post('/login', async (req, res) => {
  let findResult = await User.findOne({
    where: { loginId: req.body.loginId },
  });
  if (!findResult) {
    await User.create({
      loginId: req.body.loginId,
      name: req.body.name,
      email: req.body.email,
      img: req.body.img,
      logoUrl: req.body.logoUrl,
      option: req.body.option,
    });
  }
  findResult = await User.findOne({
    where: { loginId: req.body.loginId },
    attribute: { exclude: ['createdAt', 'updatedAt', 'refreshToken'] },
  });
  const accessToken = await jwt.sign({ id: findResult.id }, process.env.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '0.2m',
  });
  const refreshToken = await jwt.sign({ id: findResult.id }, process.env.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '14d',
  });

  return res.status(201).send({ user: findResult, accessToken, refreshToken });
});

router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('user');
  return res.status(201).send();
});

module.exports = router;
