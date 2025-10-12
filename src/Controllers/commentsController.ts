import {Request, Response} from "express"
import {PostsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {httpStatuses} from "../settings";
import {CommentsService} from "../Services/commentsService";
import {CommentsQueryRep} from "../Repository/queryRep/commentsQueryRep";
import {mapToView, queryHelper} from "../Features/globalFeatures/helper";
import {
    AccessTokenPayload,
    CommentPagesType,
    CommentQueryType,
    CommentsClass,
    CommentsViewClass,
    InputQueryType
} from "../Types/Types";
import {inject} from "inversify";
import {jwtService} from "../Features/globalFeatures/jwtService";


export class CommentsController {

    constructor(
        @inject(PostsQueryRep) protected postsQueryRep: PostsQueryRep,
        @inject(CommentsQueryRep) protected commentsQueryRep: CommentsQueryRep,
        @inject(CommentsService) protected commentsService: CommentsService,
    ){}

    async createCommentForPost (req: Request, res: Response) {

        const isPostExists = await this.postsQueryRep.findPostById(req.params.postId)
        if (!isPostExists) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }
        const newComment: CommentsViewClass = await this.commentsService.createComment(req.body, req.user, req.params.postId)
        res
            .status(httpStatuses.CREATED_201)
            .json(newComment)
    }

    async getCommentsForPost (req: Request, res: Response){

        const isPostExists = await this.postsQueryRep.findPostById(req.params.postId)
        if (!isPostExists) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
            return
        }

        const isTokenPassed: AccessTokenPayload | null = req.headers.authorization ? await jwtService.verifyAccessToken(req.headers.authorization.split(' ')[1]) : null
        let userId: string = isTokenPassed ? isTokenPassed.id : ""

        const sanitizedQuery: CommentQueryType = queryHelper.commentsQuery(req.query as InputQueryType)
        const notMappedComments: CommentPagesType = await this.commentsQueryRep.findManyCommentsByPostId(req.params.postId, sanitizedQuery, userId)
        const mappedComments: CommentsViewClass[] = mapToView.mapComments(notMappedComments.items, userId)
        const commentsToView = {
            ...notMappedComments.items,
            items: mappedComments
            }

        res
            .status(httpStatuses.OK_200)
            .json(commentsToView)
    }

    async getCommentById (req: Request, res: Response){

        const isTokenExists: AccessTokenPayload | null = req.headers.authorization ? await jwtService.verifyAccessToken(req.headers.authorization.split(' ')[1]) : null
        let userId: string = isTokenExists ? isTokenExists.id : ""

        const neededComment: CommentsClass | null = await this.commentsQueryRep.findCommentById(req.params.id)
        if (neededComment) {
            let myStatus: string = "None"
            if (neededComment.likesInfo.likedBy.includes(userId)) {
                myStatus = "Like"
            }
            if (neededComment.likesInfo.dislikedBy.includes(userId)) {
                myStatus = "Dislike"
            }
            const commentToView: CommentsViewClass = new CommentsViewClass(
                neededComment.id,
                neededComment.content,
                neededComment.commentatorInfo,
                neededComment.createdAt,
                {
                    likesCount: neededComment.likesInfo.likedBy.length,
                    dislikesCount: neededComment.likesInfo.dislikedBy.length,
                    myStatus: myStatus
                }
            )

            res
                .status(httpStatuses.OK_200)
                .json(commentToView)
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }

    async updateCommentById (req: Request, res: Response){

        const neededComment: CommentsClass | null = await this.commentsQueryRep.findCommentById(req.params.commentId)
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
            await this.commentsService.updateComment(req.body.content, req.params.commentId)
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        }
    }

    async deleteCommentById (req: Request, res: Response){
        const neededComment = await this.commentsQueryRep.findCommentById(req.params.commentId)
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
            await this.commentsService.deleteComment(req.params.commentId)
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        }
    }

    async likeComment (req: Request, res: Response) {

        const isCommentExists = await this.commentsQueryRep.findCommentById(req.params.commentId)
        if(!isCommentExists) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }

        await this.commentsService.updateLikeStatus(req.params.commentId, req.body.likeStatus, req.user.id)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }
}