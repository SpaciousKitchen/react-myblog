const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    jwt.verify(bearerHeader, process.env.SECRET_KEY, async (err, authData) => {
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
