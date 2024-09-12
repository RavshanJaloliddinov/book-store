const Joi = require("joi")

const verifyOTPDto = Joi.object({
  verifyText: Joi.string().required(),
  code: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = verifyOTPDto