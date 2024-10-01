import {commentContentType, commentType, userViewType} from "../Types/Types";
import {commentCollection} from "../db/MongoDB";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    async create (comment:commentContentType, userInfo: userViewType, postId: string) {
        const newComment: commentType = {
            id: new ObjectId().toString(),
            content: comment.content,
            commentatorInfo: {
                userId: userInfo.id,
                userLogin: userInfo.login
            },
            createdAt: new Date().toISOString(),
            postId: postId
        }
        await commentCollection.insertOne(newComment)
        return newComment.id
    },

    async update(comment:commentContentType, id: string) {
        return await commentCollection.updateOne({id: id}, {$set: {content: comment.content}})
    },

    async delete(id: string){
        return commentCollection.deleteOne({id: id})
    }
}