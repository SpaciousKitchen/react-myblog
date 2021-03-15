const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { verifyToken } = require('./auth');

router.get('/loadUserInfo', async (req, res) => {
  if (req.cookies.user) {
    const clientToken = req.cookies.user;
    jwt.verify(clientToken, process.env.SECRET_KEY, async (err, authData) => {
      if (err) {
        next(err);
      } else {
        req.userId = authData.user.id;
        try {
          const findResult = await User.findOne({
            where: { id: req.userId },
          });
          return res.status(201).send({ user: findResult });
        } catch (error) {
          next(error);
        }
      }
    });
  }
});

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

    const token = jwt.sign({ user: createResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '30m',
    });
    console.log('token', token);
    return res.status(201).send({ user: createResult, token });
  } else {
    const token = jwt.sign({ user: findResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '30m',
    });
    return res.status(201).send({ user: findResult, token });
  }
});

router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('user');
  return res.status(201).send();
});

module.exports = router;
