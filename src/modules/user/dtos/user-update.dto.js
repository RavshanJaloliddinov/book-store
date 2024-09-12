const Joi = require('joi');

// User uchun Joi validatsiya sxemasi
const createUserSchema = Joi.object({
    full_name: Joi.string()
        .min(3) // Ism kamida 3 ta belgidan iborat bo'lishi kerak
        .required().messages({
            "string.empty": "full name kiritish shart",
            "any.required": "full name kiritish shart"
        }),
        
    email: Joi
        .string()
        .email({ tlds: { allow: ['com', 'net'] } }) // Faqat .com va .net domenlariga ruxsat
        .min(5) // Minimal uzunlik 5 ta belgidan kam bo'lmasligi kerak
        .max(50) // Maksimal uzunlik 50 belgidan oshmasligi kerak
        .required(), // Email majburiy bo'lishi kerak

    phone: Joi
        .string()
        .length(12) // Telefon raqami uzunligi 12 ta belgi bo'lishi kerak
        .pattern(/^[0-9]+$/) // Faqat raqamlardan iborat bo'lishi kerak
        .messages({
        "string.empty": "phone kiritish shart",
        "string.length": "phone 12 ta belgidan iborat bo'lishi kerak",
        }),

    image: Joi.string().optional() // Image kiritish ixtiyoriy
});

module.exports = {
    createUserSchema
};