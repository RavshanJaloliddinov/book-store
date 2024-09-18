const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


const signToken = (tokenData) =>
  jwt.sign(tokenData, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

const verifyToken = (token) =>
  jwt.verify(token, jwtConfig.secretKey, (err, _) => {
    if (err && err instanceof jwt.NotBeforeError) {
      throw new error("Not before JWT error");
    }

    if (err && err instanceof jwt.TokenExpiredError) {
      throw new error("Token already expired");
    }
    
    if (err && err instanceof jwt.JsonWebTokenError) {
      throw new error("Invalid JWT token");
    }
  });

module.exports = signToken, verifyToken