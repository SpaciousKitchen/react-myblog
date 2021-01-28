const express = require('express');
const { User } = require('../models');
router = express.Router();
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

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

    return res.send(createResult);
  } else {
    return res.send(findResult);
  }
});

router.post('/logout', (req, res) => {
  if (req.session) {
    console.log(session);
    req.session.destroy();
    return res.status(201).send();
  } else {
    res.status(401).send({ error: 'Please Login First' });
  }
});

module.exports = router;
