const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const clientToken = req.cookies.user;
  console.log('clientToken', clientToken);

  if (typeof clientToken !== 'undefined') {
    jwt.verify(clientToken, process.env.SECRET_KEY, async (err, authData) => {
      if (err) {
        next(err);
      } else {
        req.userId = authData.user.id;
      }
    });
    next();
  } else {
    next('error');
  }
};
