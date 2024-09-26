const ConflictException = require('../exceptions/conflic.exception')


const CheckRoleGuards = (...roles) => {
  return (req, res, next) => {


    if (!roles.length) {
      return next();
    }

    console.log(req.role)
    if (!roles.includes(req.role)) {
      res.send(
        ConflictException(
          `User don't have access to url: ${req.url} with method: ${req.method}`
        ))
    }


    next();
  };
};

module.exports = CheckRoleGuards