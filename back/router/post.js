const express = require('express');
router = express.Router();
const { FreePost } = require('../models');
const { FreeComment } = require('../models');
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
    const findPosts = await FreePost.findAll({
      attributes: ['id', 'content', 'views', 'createdAt', 'subject'],
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name', 'img'] },
        {
          model: FreeComment,
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
    console.log(file);
    cb(null, 'uploads/');
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 50000000 } });
router.post('/image', verifyToken, upload.single('img'), async (req, res) => {
  // console.log(req);

  return res.status(201).send({ filename: req.file.filename });
});

router.post('/addpost', verifyToken, async (req, res) => {
  const postCreate = await FreePost.create({
    subject: req.body.subject,
    content: req.body.content,
    userId: req.userId,
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

  return res.status(201).send(findPost);
});
router.post('/editPost/:id', verifyToken, async (req, res) => {
  try {
    await FreePost.update(
      { content: req.body.content, subject: req.body.subject },
      {
        where: {
          id: req.params.id,
          userId: req.userId,
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
});
router.delete('/deletePost/:id', verifyToken, async (req, res) => {
  const findPost = await FreePost.findOne({
    where: { id: req.params.id },
  });

  if (findPost.userId == req.userId) {
    await FreePost.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });
    return res.status(201).send({ postId: req.params.id });
  } else {
    // return res.status(401).send({ error: 'You cant Delete the post' });
    next('error');
  }
});
router.post('/:id/addComment', verifyToken, async (req, res) => {
  const createComment = await FreeComment.create({
    freepostId: req.params.id,
    userId: req.userId,
    content: req.body.commentText,
  });

  const findComment = await FreeComment.findOne({
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
    await FreeComment.update(
      { content: req.body.content },
      {
        where: {
          id: req.params.commentId,
          freepostId: req.params.postId,
        },
      },
    );

    const changefindComment = await FreeComment.findOne({
      where: { id: req.params.commentId },
      attributes: ['id', 'content', 'freepostId'],
    });

    return res.status(201).send(changefindComment);
  } catch (error) {
    next('error');
  }
});

router.delete('/:postId/deleteComment/:commentId', verifyToken, async (req, res, next) => {
  const findComment = await FreeComment.findOne({
    where: {
      id: req.params.commentId,
      freepostId: req.params.postId,
    },
  });

  if (findComment.userId === req.userId) {
    await FreeComment.destroy({
      where: {
        id: findComment.id,
        freepostId: findComment.freepostId,
        userId: findComment.userId,
      },
    });
    return res.status(201).send({ postId: findComment.freepostId, commentId: findComment.id });
  } else {
    next(error);
  }
});

module.exports = router;
