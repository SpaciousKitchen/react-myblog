exports.NotlogInError = function (err, req, res, next) {
  console.log('pass1');
  if (!req.userId) {
    return res.status(401).send({ erorr: '로그인을해야합니다.' });
  } else {
    next(err);
  }
};

exports.loginError = function (err, req, res, next) {
  console.log('pass2');
  if (req.userId) {
    console.log(err);
    return res.status(401).send({ error: '권한이 없습니다.' });
  } else {
    next(err);
  }
};

exports.serverError = function (err, req, res) {
  console.log('pass3');
  console.error(err.stack);
  return res.status(500).send({ error: '서버에러!' });
};
