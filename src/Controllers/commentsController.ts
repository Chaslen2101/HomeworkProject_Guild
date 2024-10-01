import {Request, Response} from "express"
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {httpStatuses} from "../settings";
import {commentService} from "../Services/commentService";
import {commentsQueryRep} from "../Repository/queryRep/commentsQueryRep";
import {mapToView, queryHelper} from "../Features/globalFeatures/helper";
import {commentQueryType, inputQueryType} from "../Types/Types";

export const createCommentForPost = async (req: Request, res: Response) => {
    console.log("create comment controller on")
    const isPostExists = await postsQueryRep.findPostById(req.params.postId)
    if (!isPostExists) {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
        return
    }
    const newCommentId: string = await commentService.createComment(req.body, req.user, req.params.postId)
    const newComment = await commentsQueryRep.findCommentById(newCommentId)
    console.log('Comment for post created successfully')
    res
        .status(httpStatuses.CREATED_201)
        .json(mapToView.mapComment(newComment))
}

export const getCommentsForPost = async (req: Request, res: Response) => {
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
        .json(await commentsQueryRep.findCommentsByPostId(req.params.postId, sanitizedQuery))
}

export const getCommentsById = async (req: Request, res: Response) => {
    console.log("get comment controller on")
    const neededComment = await commentsQueryRep.findCommentById(req.params.id)
    if (neededComment) {
        console.log("comment founded successfully")
        res
            .status(httpStatuses.OK_200)
            .json(mapToView.mapComment(neededComment))
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const updateCommentById = async (req: Request, res: Response) => {
    const neededComment = await commentsQueryRep.findCommentById(req.params.commentId)
    if(!neededComment) {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
        return
    }
    if(neededComment.commentatorInfo.userId !== req.user.id) {
        res
            .status(httpStatuses.FORBIDDEN_403)
            .json({})

    }else {
        await commentService.updateComment(req.body, req.params.commentId)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }
}

export const deleteCommentById = async (req: Request, res: Response) => {
    const neededComment = await commentsQueryRep.findCommentById(req.params.commentId)
    if (!neededComment) {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
        return
    }
    if(neededComment.commentatorInfo.userId !== req.user.id) {
        res
            .status(httpStatuses.FORBIDDEN_403)
            .json({})

    }else {
        await commentService.deleteComment(req.params.commentId)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }
}