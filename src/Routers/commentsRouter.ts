import {Router} from "express";
import {commentInputValidator, likeStatusValidator} from "../Features/validators/commentsValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {authorizationCheck, commentsController} from "../composition-root";

export const commentsRouter = Router({})

commentsRouter.get("/:id",commentsController.getCommentById.bind(commentsController))
commentsRouter.put("/:commentId", authorizationCheck.accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, commentsController.updateCommentById.bind(commentsController))
commentsRouter.delete("/:commentId", authorizationCheck.accessTokenCheck, commentsController.deleteCommentById.bind(commentsController))
commentsRouter.put("/:commentId/like-status",authorizationCheck.accessTokenCheck,likeStatusValidator(),inputErrorCheckValidator,commentsController.likeComment.bind(commentsController))