const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

function reSignToken(data) {
  const token = jwt.sign({ id: data }, process.env.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '1m',
  });
  console.log(token);
  return token;
}

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const authData = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = authData.id;
    req.token = reSignToken(authData.id);
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).send({ code: 1010, message: '토큰 유효기한이 만료되었습니다' });
    } else {
      return res.status(401).send({ code: 1011, message: error.message });
    }
  }
};
