const { Router } = require("express")
const { ValidationMiddleware } = require("../../middleware/validation.middleware")
const { createCommentSchema } = require("./dtos/comment-create.dto")
const CommentController = require("./comment.controller")

const commentRouter = Router()

commentRouter
    .get("/", CommentController.getAllComments)
    .post("/", ValidationMiddleware(createCommentSchema), CommentController.createComment)
    .delete("/:commentId", CommentController.deleteComment)


module.exports = commentRouter