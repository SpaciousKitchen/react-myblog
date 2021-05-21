const express = require('express');
router = express.Router();
const { FeedPost } = require('../models');
const { FeedComment } = require('../models');
const { User } = require('../models');
const { verifyToken } = require('./auth');
const multer = require('multer');
const path = require('path');

const fs = require('fs');
try {
  fs.accessSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
} //파일 없을시에 생성

router.get('/loadPosts', async (req, res, next) => {
  try {
    const findPosts = await FeedPost.findAll({
      attributes: ['id', 'content', 'views', 'createdAt', 'subject'],
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name', 'img'] },
        {
          model: FeedComment,
          attributes: ['id', 'content', 'createdAt'],
          include: {
            model: User,
            attributes: ['id', 'name', 'img'],
            order: [['createdAt', 'DESC']],
          },
        },
      ],
    });

    return res.status(201).send(findPosts);
  } catch (error) {
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 50000000 } });
router.post('/image', verifyToken, upload.single('img'), async (req, res) => {
  return res.status(201).send({ filename: req.file.filename });
});

router.post('/addpost', verifyToken, async (req, res) => {
  const postCreate = await FeedPost.create({
    subject: req.body.subject,
    content: req.body.content,
    userId: req.userId,
    views: 0,
  });

  const findPost = await FeedPost.findOne({
    where: { id: postCreate.id },
    attributes: ['id', 'content', 'views', 'createdAt', 'subject'],
    include: {
      model: User,
      attributes: ['id', 'name', 'img'],
    },
  });

  return res.status(201).send(findPost);
});
router.post('/editPost/:id', verifyToken, async (req, res) => {
  try {
    await FeedPost.update(
      { content: req.body.content, subject: req.body.subject },
      {
        where: {
          id: req.params.id,
          userId: req.userId,
        },
      },
    );

    const changefindPost = await FeedPost.findOne({
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
});
router.delete('/deletePost/:id', verifyToken, async (req, res) => {
  const findPost = await FeedPost.findOne({
    where: { id: req.params.id },
  });

  if (findPost.userId == req.userId) {
    await FeedPost.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    return res.status(201).send({ postId: req.params.id });
  } else {
    next('error');
  }
});
router.post('/:id/addComment', verifyToken, async (req, res) => {
  const createComment = await FeedComment.create({
    feedpostId: req.params.id,
    userId: req.userId,
    content: req.body.commentText,
  });

  const findComment = await FeedComment.findOne({
    where: { id: createComment.id },
    attributes: ['id', 'content', 'createdAt'],
    include: {
      model: User,
      attributes: ['id', 'name', 'img'],
    },
  });

  return res.status(201).send({
    postId: parseInt(req.params.id, 10),
    comment: findComment,
  });
});

router.post('/:postId/editComment/:commentId', verifyToken, async (req, res, next) => {
  try {
    await FeedComment.update(
      { content: req.body.content },
      {
        where: {
          id: req.params.commentId,
          feedpostId: req.params.postId,
        },
      },
    );

    const changefindComment = await FeedComment.findOne({
      where: { id: req.params.commentId },
      attributes: ['id', 'content', 'feedpostId'],
    });

    return res.status(201).send(changefindComment);
  } catch (error) {
    next('error');
  }
});

router.delete('/:postId/deleteComment/:commentId', verifyToken, async (req, res, next) => {
  const findComment = await FeedComment.findOne({
    where: {
      id: req.params.commentId,
      feedpostId: req.params.postId,
    },
  });

  if (findComment.userId === req.userId) {
    await FeedComment.destroy({
      where: {
        id: findComment.id,
        feedpostId: findComment.feedpostId,
        userId: findComment.userId,
      },
    });
    return res.status(201).send({ postId: findComment.feedpostId, commentId: findComment.id });
  } else {
    next(error);
  }
});

module.exports = router;
