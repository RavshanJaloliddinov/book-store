const Joi = require('joi');
const mongoose = require('mongoose')

// Joi validatsiya sxemasi
const updateCategorySchema = Joi.object({
    name: Joi.string()
        .messages({
            "string.empty": "name kiritish shart",
            "any.required": "name kiritish shart"
        }),
    
    category_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('category_id noto‘g‘ri ObjectId formatida bo‘lishi kerak');
            }
            return value;
        })
        .optional() // category_id majburiy emas
});

module.exports = {
    updateCategorySchema
};