import {Router} from "express";
import {deleteCommentById, getCommentsById, updateCommentById} from "../Controllers/commentsController";
import {accessTokenCheck} from "../Features/globalFeatures/authorizationCheck";
import {commentInputValidator} from "../Features/validators/commentValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";

export const commentsRouter = Router({})

commentsRouter.get("/:id",getCommentsById)
commentsRouter.put("/:commentId", accessTokenCheck, commentInputValidator(), inputErrorCheckValidator, updateCommentById)
commentsRouter.delete("/:commentId", accessTokenCheck, deleteCommentById)