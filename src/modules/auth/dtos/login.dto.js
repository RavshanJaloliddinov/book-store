const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: ['com', 'net'] } }) // Faqat .com va .net domenlariga ruxsat
        .min(5) // Minimal uzunlik 5 ta belgidan kam bo'lmasligi kerak
        .max(50) // Maksimal uzunlik 50 belgidan oshmasligi kerak
        .required(), // Email majburiy bo'lishi kerak
    code: Joi.string()
        .length(6) // Kod uzunligi aniq 6 bo'lishi kerak
        .pattern(/^[0-9]+$/) // Faqat raqamlardan iborat bo'lishi kerak
        .required() // Kod majburiy bo'lishi kerak
});


module.exports = {
    loginSchema
};
