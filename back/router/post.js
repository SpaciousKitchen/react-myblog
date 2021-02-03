const express = require('express');
router = express.Router();
const { FreePost } = require('../models');
const { User } = require('../models');

router.get('/loadPosts', async (req, res, next) => {
  try {
    const findPosts = await FreePost.findAll({
      attributes: ['id', 'content', 'views', 'createdAt', 'subject'],
      include: {
        model: User,
        attributes: ['id', 'name', 'img'],
      },
    });
    console.log('findposts', findPosts);

    return res.status(201).send(findPosts);
  } catch (error) {
    next(error);
  }
});

router.post('/addpost', async (req, res, next) => {
  if (!req.session.userId) {
    next('error');
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
router.post('/editPost/:id', async (req, res, next) => {
  console.log('pass');
  console.log(req.params.id);

  if (!req.session.userId) {
    console.log('pass');
    next('error');
  } else {
    console.log(req.body);

    try {
      await FreePost.update(
        { content: req.body.content, subject: req.body.subject },
        {
          where: {
            id: req.params.id,
            userId: req.session.userId,
          },
        },
      );

      const changefindPost = await FreePost.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          attributes: ['id', 'name', 'img'],
        },
      });

      return res.status(201).send(changefindPost);
    } catch (error) {
      next(error);
    }
  }
});
router.delete('/deletePost/:id', async (req, res, next) => {
  console.log('delete');
  console.log(req.params.id);

  if (!req.session.userId) {
    next('error');
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
      // return res.status(401).send({ error: 'You cant Delete the post' });
      next('error');
    }
  }
});

module.exports = router;
