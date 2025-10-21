import {Router} from "express";
import {inputErrorCheckValidator} from "../Infrastructure/Features/GlobalFeatures/inputCheckErrorValidator";
import {commentInputValidator} from "../Infrastructure/Features/Validators/commentsValidator";
import {authorizationCheck, commentsController, postsController, postsValidator} from "../composition-root";


export const postsRouter = Router({})

postsRouter.get("/", postsController.returnAllPosts.bind(postsController))
postsRouter.post("/", authorizationCheck.base64AuthorizationCheck,postsValidator.inputPostsValidation(), inputErrorCheckValidator,postsController.createPost.bind(postsController))
postsRouter.get("/:id", postsController.findPostById.bind(postsController))
postsRouter.put("/:id", authorizationCheck.base64AuthorizationCheck, postsValidator.inputPostsValidation(), inputErrorCheckValidator,postsController.updatePostByID.bind(postsController))
postsRouter.delete("/:id",authorizationCheck.base64AuthorizationCheck,postsController.deletePostById.bind(postsController))
postsRouter.post("/:postId/comments", authorizationCheck.accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, commentsController.createCommentForPost.bind(commentsController))
postsRouter.get("/:postId/comments", commentsController.getCommentsForPost.bind(commentsController))
postsRouter.put("/:postId/like-status", authorizationCheck.accessTokenCheck, postsValidator.likeStatusValidation(), inputErrorCheckValidator, postsController.updateLikeStatus.bind(postsController))