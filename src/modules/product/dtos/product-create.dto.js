const Joi = require('joi');
const mongoose = require('mongoose');

// Joi validatsiya sxemasi
const createProductSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "Title kiritish shart",
            "any.required": "Title kiritish shart"
        }),

    category_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('category_id noto‘g‘ri ObjectId formatida bo‘lishi kerak');
            }
            return value;
        })
        .required()
        .messages({
            "string.empty": "Category ID kiritish shart",
            "any.required": "Category ID kiritish shart"
        }),

    price: Joi.number()
        .required()
        .positive()
        .messages({
            "number.base": "Price raqam bo‘lishi kerak",
            "any.required": "Price kiritish shart",
            "number.positive": "Price musbat raqam bo‘lishi kerak"
        }),

    images: Joi.array()
    .items(
        Joi.object({
            filename: Joi.string()
                .required()
                .messages({
                    "string.empty": "Fayl nomi bo'sh bo'lishi mumkin emas",
                    "any.required": "Fayl nomini kiritish shart"
                })
        })
    )
    .required()
    .messages({
        "array.base": "Images massiv bo'lishi kerak",
        "array.empty": "Kamida bitta fayl kiritish kerak",
        "any.required": "Images kiritish shart"
    }),

    description: Joi.string()
        .required()
        .messages({
            "string.empty": "Description kiritish shart",
            "any.required": "Description kiritish shart"
        }),

    author: Joi.string()
        .required()
        .messages({
            "string.empty": "Author kiritish shart",
            "any.required": "Author kiritish shart"
        }),

    publisher: Joi.string()
        .required()
        .messages({
            "string.empty": "Publisher kiritish shart",
            "any.required": "Publisher kiritish shart"
        }),

    language: Joi.string()
        .required()
        .messages({
            "string.empty": "Language kiritish shart",
            "any.required": "Language kiritish shart"
        }),

    genre: Joi.string()
        .valid('Fantasy', 'Science Fiction', 'Adventure', 'Mystery', 'Thriller', 'Romance', 'Drama', 'Horror', 'Historical Fiction', 'Biography', 'Non-Fiction', 'Self-Help', 'Philosophy')
        .required()
        .messages({
            "any.only": "Genre quyidagi qiymatlardan biri bo‘lishi kerak: Fantasy, Science Fiction, Adventure, Mystery, Thriller, Romance, Drama, Horror, Historical Fiction, Biography, Non-Fiction, Self-Help, Philosophy",
            "any.required": "Genre kiritish shart"
        }),

    quentitiy: Joi.number()
        .required()
        .positive()
        .messages({
            "number.base": "Quentitiy raqam bo‘lishi kerak",
            "any.required": "Quentitiy kiritish shart",
            "number.positive": "Quentitiy musbat raqam bo‘lishi kerak"
        })
});

module.exports = {
    createProductSchema
};
