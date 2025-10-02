import {Router} from "express";
import {commentsController} from "../Controllers/commentsController";
import {accessTokenCheck} from "../Features/globalFeatures/authorizationCheck";
import {commentInputValidator} from "../Features/validators/commentsValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";

export const commentsRouter = Router({})

commentsRouter.get("/:id",commentsController.getCommentsById)
commentsRouter.put("/:commentId", accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, commentsController.updateCommentById)
commentsRouter.delete("/:commentId", accessTokenCheck, commentsController.deleteCommentById)