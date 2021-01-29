const express = require('express');
router = express.Router();
const { FreePost } = require('../models');
router.post('/addpost', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Please Login First' });
  } else {
    console.log(req.body);
    const postCreate = await FreePost.create({
      subject: req.body.subject,
      content: req.body.content,
      userId: req.session.userId,
      views: 0,
    });

    const findPost = await FreePost.findOne({
      where: { id: postCreate.id },
      attributes: ['id', 'content', 'views', 'createdAt', 'subject'],
    });
    console.log('findpost', findPost);

    return res.status(201).send(findPost);
  }
});

module.exports = router;
