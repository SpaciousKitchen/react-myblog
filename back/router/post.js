const express = require('express');
router = express.Router();
const { FreePost } = require('../models');
const { User } = require('../models');
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
      include: {
        model: User,
        attributes: ['id', 'name', 'img'],
      },
    });
    console.log('findpost', findPost);

    return res.status(201).send(findPost);
  }
});
router.delete('/deletePost/:id', async (req, res) => {
  console.log('delete');
  console.log(req.params.id);

  if (!req.session.userId) {
    return res.status(401).send({ error: 'Please Login First' });
  } else {
    const findPost = await FreePost.findOne({
      where: { id: req.params.id },
    });

    if (findPost.userId == req.session.userId) {
      await FreePost.destroy({
        where: {
          id: req.params.id,
          userId: req.session.userId,
        },
      });
      return res.status(201).send({ postId: req.params.id });
    } else {
      return res.status(401).send({ error: 'You cant Delete the post' });
    }
  }
});

module.exports = router;
