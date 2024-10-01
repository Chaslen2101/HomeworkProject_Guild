import {commentContentType, userViewType} from "../Types/Types";
import {commentsRepository} from "../Repository/commentsRepository";

export const commentService = {
    async createComment(comment:commentContentType, userInfo: userViewType, postId: string) {
        return await commentsRepository.create(comment, userInfo, postId)
    },
    async updateComment(comment: commentContentType, id: string){
        return await commentsRepository.update(comment,id)
    },
    async deleteComment(id: string) {
        return commentsRepository.delete(id)
    }
}