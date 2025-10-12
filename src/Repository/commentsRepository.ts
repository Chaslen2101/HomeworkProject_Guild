import {CommentsClass} from "../Types/Types";
import {commentsModel} from "../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class CommentsRepository {

    async createComment (comment:CommentsClass): Promise<CommentsClass> {

        await commentsModel.insertOne(comment)
        return comment
    }

    async updateComment(comment:string, id: string): Promise<boolean> {

        const result = await commentsModel.updateOne({id: id}, {$set: {content: comment}})
        return result.modifiedCount === 1
    }

    async deleteComment(id: string): Promise<boolean> {

        const result = await commentsModel.deleteOne({id: id})
        return result.deletedCount === 1
    }

    async updateLikeStatus(commentId: string, likeStatus: string, userId: string): Promise<boolean> {

        let updateValue = {}
        if (likeStatus === "Like") {
            updateValue = {$addToSet: {"likesInfo.likedBy": userId}}
        }
        if(likeStatus === "Dislike") {
            updateValue = {$addToSet: {"likesInfo.dislikedBy": userId}}
        }
        if(likeStatus === "None") {
            updateValue = {$pull: {"likesInfo.likesInfo.likedBy": userId,"likesInfo.dislikedBy":userId}}
        }
        const result = await commentsModel.updateOne({id: commentId}, updateValue)
        return result.modifiedCount === 1
    }
}

