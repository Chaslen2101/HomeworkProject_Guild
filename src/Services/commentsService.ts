import {CommentsClass, CommentsViewClass, UserViewType} from "../Types/Types";
import {CommentsRepository} from "../Repository/commentsRepository";
import {inject, injectable} from "inversify";
import {ObjectId} from "mongodb";


@injectable()
export class CommentsService {

    constructor(
        @inject(CommentsRepository) protected commentsRepository: CommentsRepository
    ) {}

    async createComment(content:string, userInfo: UserViewType, postId: string):Promise<CommentsViewClass> {

        const comment: CommentsClass = new CommentsClass(
            new ObjectId().toString(),
            content,
            {
                userId: userInfo.id,
                userLogin: userInfo.login
            },
            new Date(),
            postId,
            {
                likedBy:[],
                dislikedBy:[]
            }
        )
        const newComment: CommentsClass = await this.commentsRepository.createComment(comment)
        return new CommentsViewClass(
            newComment.id,
            newComment.content,
            newComment.commentatorInfo,
            newComment.createdAt,
            {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None"
            }
        )
    }

    async updateComment(comment: string, id: string){
        return await this.commentsRepository.updateComment(comment,id)
    }

    async deleteComment(id: string) {
        return this.commentsRepository.deleteComment(id)
    }

    async updateLikeStatus(commentId: string, likeStatus: string, userId: string) {
        return await this.commentsRepository.updateLikeStatus(commentId, likeStatus, userId)
    }
}
