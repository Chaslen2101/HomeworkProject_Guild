import {Router} from "express";
import {base64AuthorizationCheck, accessTokenCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputPostsValidation} from "../Features/validators/postsValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {postsController} from "../Controllers/postsController";
import {commentInputValidator} from "../Features/validators/commentsValidator";
import {commentsController} from "../Controllers/commentsController";

export const postsRouter = Router({})

postsRouter.get("/", postsController.returnAllPosts)
postsRouter.post("/", base64AuthorizationCheck,inputPostsValidation(), inputErrorCheckValidator,postsController.inputPost)
postsRouter.get("/:id", postsController.findPostById)
postsRouter.put("/:id", base64AuthorizationCheck, inputPostsValidation(), inputErrorCheckValidator,postsController.updatePostByID)
postsRouter.delete("/:id",base64AuthorizationCheck,postsController.deletePostById)
postsRouter.post("/:postId/comments", accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, commentsController.createCommentForPost)
postsRouter.get("/:postId/comments", commentsController.getCommentsForPost)