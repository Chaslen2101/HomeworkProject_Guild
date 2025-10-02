import {Request, Response} from "express"
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {httpStatuses} from "../settings";
import {commentsService} from "../Services/commentsService";
import {commentsQueryRep} from "../Repository/queryRep/commentsQueryRep";
import {mapToView, queryHelper} from "../Features/globalFeatures/helper";
import {commentQueryType, inputQueryType} from "../Types/Types";


class CommentsController {

    async createCommentForPost (req: Request, res: Response) {

        const isPostExists = await postsQueryRep.findPostById(req.params.postId)
        if (!isPostExists) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }
        const newCommentId: string = await commentsService.createComment(req.body, req.user, req.params.postId)
        const newComment = await commentsQueryRep.findCommentById(newCommentId)
        res
            .status(httpStatuses.CREATED_201)
            .json(mapToView.mapComment(newComment))
    }

    async getCommentsForPost (req: Request, res: Response){
        const isPostExists = await postsQueryRep.findPostById(req.params.postId)
        if (!isPostExists) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }
        const sanitizedQuery: commentQueryType = queryHelper.commentsQuery(req.query as inputQueryType)
        res
            .status(httpStatuses.OK_200)
            .json(await commentsQueryRep.findManyCommentsByPostId(req.params.postId, sanitizedQuery))
    }

    async getCommentsById (req: Request, res: Response){

        const neededComment = await commentsQueryRep.findCommentById(req.params.id)
        if (neededComment) {

            res
                .status(httpStatuses.OK_200)
                .json(mapToView.mapComment(neededComment))
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }

    async updateCommentById (req: Request, res: Response){
        const neededComment = await commentsQueryRep.findCommentById(req.params.commentId)
        if (!neededComment) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }
        if (neededComment.commentatorInfo.userId !== req.user.id) {
            res
                .status(httpStatuses.FORBIDDEN_403)
                .json({})

        } else {
            await commentsService.updateComment(req.body, req.params.commentId)
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        }
    }

    async deleteCommentById (req: Request, res: Response){
        const neededComment = await commentsQueryRep.findCommentById(req.params.commentId)
        if (!neededComment) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }
        if (neededComment.commentatorInfo.userId !== req.user.id) {
            res
                .status(httpStatuses.FORBIDDEN_403)
                .json({})

        } else {
            await commentsService.deleteComment(req.params.commentId)
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        }
    }
}

export const commentsController = new CommentsController()