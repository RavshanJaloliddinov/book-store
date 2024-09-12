const Joi = require("joi");


const generateOTPDto = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = generateOTPDto