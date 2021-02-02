const express = require('express');
const { User } = require('../models');
router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/login', async (req, res, next) => {
  if (req.session.userId) {
    next(new Error('failed to load user'));
  } else {
    const findResult = await User.findOne({
      where: { loginId: req.body.loginId },
    });
    if (!findResult) {
      console.log('find1');
      const createResult = await User.create({
        loginId: req.body.loginId,
        name: req.body.name,
        email: req.body.email,
        img: req.body.img,
        logoUrl: req.body.logoUrl,
        option: req.body.option,
      });
      console.log(createResult);
      req.session.userId = createResult.id;
      return res.send(createResult);
    } else {
      console.log(findResult.id);
      req.session.userId = findResult.id;
      return res.send(findResult);
    }
  }
});

router.post('/logout', (req, res, next) => {
  if (req.session.userId) {
    req.session.destroy();
    return res.status(201).send();
  } else {
    next('error');
  }
});

module.exports = router;
