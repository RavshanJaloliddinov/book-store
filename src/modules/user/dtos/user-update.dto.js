const Joi = require('joi');

// User uchun Joi validatsiya sxemasi
const updateUserSchema = Joi.object({
    full_name: Joi.string()
        .min(3) // Ism kamida 3 ta belgidan iborat bo'lishi kerak
        .messages({
            "string.empty": "full name kiritish shart",
            "any.required": "full name kiritish shart"
        }),
        
    email: Joi
        .string()
        .email({ tlds: { allow: ['com', 'net'] } }) // Faqat .com va .net domenlariga ruxsat
        .min(5) // Minimal uzunlik 5 ta belgidan kam bo'lmasligi kerak
        .max(50), // Maksimal uzunlik 50 belgidan oshmasligi kerak
        
    image: Joi.string().optional() // Image kiritish ixtiyoriy
});

module.exports = {
    updateUserSchema
};