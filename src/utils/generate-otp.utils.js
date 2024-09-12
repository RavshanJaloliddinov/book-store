
const OtpGenerator = require( "otp-generator" )
const generateOTP = () => {
  return OtpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
};

module.exports = generateOTP