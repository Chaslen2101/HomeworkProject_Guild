import {commentContentType, existCommentType, userViewType} from "../Types/Types";
import {commentCollection} from "../db/MongoDB";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class CommentsRepository {

    async create (comment:commentContentType, userInfo: userViewType, postId: string) {
        const newComment: existCommentType = new existCommentType(
            new ObjectId().toString(),
            comment.content,
            {
                userId: userInfo.id,
                userLogin: userInfo.login
            },
            new Date().toISOString(),
            postId
        )

        await commentCollection.insertOne(newComment)
        return newComment.id
    }

    async update(comment:commentContentType, id: string) {
        return await commentCollection.updateOne({id: id}, {$set: {content: comment.content}})
    }

    async delete(id: string){
        return commentCollection.deleteOne({id: id})
    }
}

