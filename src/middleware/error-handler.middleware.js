const logger = require("../utils/logger.utils.js")

const dublicateFieldException = (err) => {
  const error = { ...err };

  if (error.code != 11000) {
    return error;
  }

  error.name = "Validation Error";
  error.message = `Given value "${Object.values(error.keyValue).join(
    " "
  )}" for "${Object.keys(error.keyValue).join(
    " "
  )}" is already exists. Try another one!`;
  error.statusCode = 400;
  error.isException = true;

  return error;
};

const ErrorHandlerMiddleware = (error, req, res, next) => {

  error = dublicateFieldException(error);

  if (error.isException) {
    
    logger.error(
      `Exception (${error.name}): message: ${error.message}, status: ${
        error.statusCode
      }; Time: ${new Date()}`
    );

    return res.status(error.statusCode).send({
      name: error.name,
      message: error.message,
    });
  }

  res.status(500).send({
    message: "Internal Server Error",
  });
};
module.exports = ErrorHandlerMiddleware