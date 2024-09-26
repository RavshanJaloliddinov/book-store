const jwt = require('jsonwebtoken')
const BadRequestException = require('../exceptions/bad-request.exception')
const {verifyToken} = require('../helper/jwt.helper')


const CheckAuthGuards = (isProtected) => {
  return (req, _, next) => {
    if (!isProtected) {
      return next();
    }

    const token = req.headers["authorization"];

    if (!(token && token.startsWith("Bearer") && token.split(" ")[1])) {
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }

    const accessToken = token.split(" ")[1];

    // Verify access token
    verifyToken(accessToken);

    const { id, role } = jwt.decode(accessToken);

    // SET ID AND ROLE TO REQUEST OBJECT
    req.userId = id;
    req.role = role;

    next();
  };
};

module.exports = CheckAuthGuards