const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.verifyToken = async (req, res, next) => {
  console.log('pass!!!!');
  const clientToken = req.cookies.userAccess;
  const refreshToken = req.cookies.userRefresh;
  if (!clientToken) {
    next('error');
  }
  console.log(clientToken);

  const authData = await jwt.verify(clientToken, process.env.SECRET_KEY);
  if (authData === -3 || authData === -2) {
    next('error');
    if (!checkIsVable(refreshToken)) {
      //회원 정보와 비교,
      next('error');
    } else {
      const accessToken = await jwt.sign({ id: createResult.id }, process.env.SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '30m',
      });
      res.cookie('userAccess', accessToken, { secure: true, httpOnly: true });
      next();
    }
  } else {
    req.userId = authData.id;
    next();
  }
};

exports.checkIsVable = async data => {
  try {
    await User.findOne({
      where: { refreshToken: data },
    });
    return true;
  } catch (error) {
    return false;
  }
};
