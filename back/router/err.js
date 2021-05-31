exports.refererCheck = (req, res, next) => {
  if (req.headers.referer === 'http://localhost:8080/') {
    next();
  } else {
    res.status(403).send('Referer Error');
  }
};

exports.NotlogInError = function (err, req, res, next) {
  if (!req.userId) {
    return res.status(401).send({ erorr: '로그인을해야합니다.' });
  } else {
    next(err);
  }
};

exports.loginError = function (err, req, res, next) {
  if (req.userId) {
    return res.status(401).send({ error: '권한이 없습니다.' });
  } else {
    next(err);
  }
};

exports.serverError = function (err, req, res) {
  return res.status(500).send({ error: '서버에러!' });
};
