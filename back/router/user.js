const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { verifyToken } = require('./auth');

router.get('/loadUserInfo', verifyToken, async (req, res) => {
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

    const accessToken = await jwt.sign({ user: createResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '30m',
    });
    const refreshToken = await jwt.sign({ user: createResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    await User.update(
      { refreshToken: refreshToken },
      {
        where: { id: createResult.id },
      },
    );
    res.cookie('userAccess', accessToken);
    res.cookie('userRefresh', efreshToken);
    return res.status(201).send({ user: createResult, accessToken, refreshToken });
  } else {
    const accessToken = await jwt.sign({ user: findResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '30m',
    });

    const refreshToken = await jwt.sign({ user: findResult }, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    await User.update(
      { refreshToken: refreshToken },
      {
        where: { id: findResult.id },
      },
    );
    res.cookie('user', accessToken);
    res.cookie('userRefresh', refreshToken);
    return res.status(201).send({ user: findResult, accessToken, refreshToken });
  }
});

router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('user');
  return res.status(201).send();
});

module.exports = router;
