import {Router} from "express";
import {base64AuthorizationCheck, tokenAuthCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputPostsValidation} from "../Features/validators/postValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {
    deletePostById,
    findPostById,
    inputPostController, returnAllPostsController,
    updatePostByID
} from "../Controllers/postController";
import {commentInputValidator} from "../Features/validators/commentValidator";
import {createCommentForPost, getCommentsForPost} from "../Controllers/commentsController";

export const postsRouter = Router({})

postsRouter.get("/", returnAllPostsController)
postsRouter.post("/", base64AuthorizationCheck,inputPostsValidation(), inputErrorCheckValidator,inputPostController)
postsRouter.get("/:id", findPostById)
postsRouter.put("/:id", base64AuthorizationCheck, inputPostsValidation(), inputErrorCheckValidator,updatePostByID)
postsRouter.delete("/:id",base64AuthorizationCheck,deletePostById)
postsRouter.post("/:postId/comments", tokenAuthCheck, commentInputValidator(), inputErrorCheckValidator, createCommentForPost)
postsRouter.get("/:postId/comments", getCommentsForPost)