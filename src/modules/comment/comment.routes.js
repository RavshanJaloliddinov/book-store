const { Router } = require("express")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const { createCommentSchema } = require("./dtos/comment-create.dto")
const CommentController = require("./comment.controller")
const CheckRoleGuards = require('../../guards/check-role.guard')
const CheckAuthGuards = require('../../guards/check-auth.guard')


const commentRouter = Router()

commentRouter
    .get(
        "/", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        CommentController.getAllComments
    )
    .post(
        "/", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        ValidationMiddleware(createCommentSchema), 
        CommentController.createComment
    )
    .delete(
        "/:commentId", 
        CheckAuthGuards(true),
        CheckRoleGuards("super-admin", "admin", 'user'),
        CommentController.deleteComment
    )


module.exports = commentRouter 