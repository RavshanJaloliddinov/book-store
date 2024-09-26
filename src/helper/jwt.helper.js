const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const BadRequestException = require('../exceptions/bad-request.exception.js')
const TokenExpiredException = require('../exceptions/token-expired.exception.js')
const signToken = (tokenData) =>
  jwt.sign(tokenData, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

const verifyToken = (token) =>
  jwt.verify(token, jwtConfig.secretKey, (err, _) => {

    if (err && err instanceof jwt.NotBeforeError) {
      throw new BadRequestException("Not before JWT erro")
    }

    if (err && err instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredException("token already exists")
    }

    if (err && err instanceof jwt.JsonWebTokenError) {
      throw new BadRequestException("Invalid JwT token")
    }
    console.log("verify")
  });

module.exports = {signToken, verifyToken}
