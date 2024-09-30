import {Router} from "express";
import {deleteCommentById, getCommentsById, updateCommentById} from "../Controllers/commentsController";
import {tokenAuthCheck} from "../Features/globalFeatures/authorizationCheck";
import {commentInputValidator} from "../Features/validators/commentValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";

export const commentsRouter = Router({})

commentsRouter.get("/:id",getCommentsById)
commentsRouter.put("/:commentId", tokenAuthCheck, commentInputValidator(), inputErrorCheckValidator, updateCommentById)
commentsRouter.delete("/:commentId", tokenAuthCheck, deleteCommentById)