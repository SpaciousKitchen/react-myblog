exports.NotlogInError = function (err, req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ erorr: '권한이 없습니다!' });
  } else {
    next(err);
  }
};

exports.loginError = function (err, req, res, next) {
  if (req.session.userId) {
    return res.status(401).send({ error: '로그인을 해야합니다.' });
  } else {
    next(err);
  }
};

exports.serverError = function (err, req, res) {
  console.error(err.stack);
  return res.status(500).send({ error: '서버에러!' });
};
