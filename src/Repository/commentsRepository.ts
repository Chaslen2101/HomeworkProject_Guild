import {CommentsClass, userViewType} from "../Types/Types";
import {commentsModel} from "../db/MongoDB";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class CommentsRepository {

    async create (comment:CommentsClass, userInfo: userViewType, postId: string): Promise<string> {
        const newComment: CommentsClass = new CommentsClass(
            new ObjectId().toString(),
            comment.content,
            {
                userId: userInfo.id,
                userLogin: userInfo.login
            },
            new Date().toISOString(),
            postId
        )

        await commentsModel.insertOne(newComment)
        return newComment.id
    }

    async updateComment(comment:CommentsClass, id: string): Promise<void> {

        const result = await commentsModel.updateOne({id: id}, {$set: {content: comment.content}})
        return
    }

    async deleteComment(id: string): Promise<void> {

        const result = await commentsModel.deleteOne({id: id})
        return
    }
}

