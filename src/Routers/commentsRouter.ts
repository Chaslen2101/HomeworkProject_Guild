import {Router} from "express";
import {commentInputValidator, likeStatusValidator} from "../Infrastructure/Features/Validators/commentsValidator";
import {inputErrorCheckValidator} from "../Infrastructure/Features/GlobalFeatures/inputCheckErrorValidator";
import {authorizationCheck, commentsController} from "../composition-root";

export const commentsRouter = Router({})

commentsRouter.get("/:id",commentsController.getCommentById.bind(commentsController))
commentsRouter.put("/:commentId", authorizationCheck.accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, commentsController.updateCommentById.bind(commentsController))
commentsRouter.delete("/:commentId", authorizationCheck.accessTokenCheck, commentsController.deleteCommentById.bind(commentsController))
commentsRouter.put("/:commentId/like-status",authorizationCheck.accessTokenCheck,likeStatusValidator(),inputErrorCheckValidator,commentsController.updateLikeStatus.bind(commentsController))