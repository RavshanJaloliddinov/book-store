const Joi = require("joi");


const createCommentSchema = Joi.object({
    book_id: Joi.string().required().messages({
        "any.required": "book_id kiritilishi shart",
        "string.empty": "book_id bo'sh bo'lmasligi kerak"
    }),
    user_id: Joi.string().required().messages({
        "any.required": "user_id kiritilishi shart",
        "string.empty": "user_id bo'sh bo'lmasligi kerak"
    }),
    comment: Joi.string().required().messages({
        "any.required": "Comment kiritilishi shart",
        "string.empty": "Comment bo'sh bo'lmasligi kerak"
    }),
    created_date: Joi.date().default(Date.now)
});

module.exports = {
    createCommentSchema
};