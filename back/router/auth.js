const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const clientToken = req.cookies.user;
  console.log('clientToken', clientToken);
  if (!clientToken) {
    next('error');
  }
  const authData = await jwt.verify(clientToken, process.env.SECRET_KEY);
  if (authData === -3 || authData === -2) {
    next('error');
  } else {
    req.userId = authData.user.id;
    next();
  }
};
