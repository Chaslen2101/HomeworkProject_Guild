import {existUserType} from "../Types/Types";
import {commentsRepository} from "../Repository/commentsRepository";

export const commentService = {
    async createComment(content: string, userInfo: existUserType, postId: string) {
        return await commentsRepository.create(content, userInfo, postId)
    },
    async updateComment(content: string, id: string){
        return await commentsRepository.update(content,id)
    },
    async deleteComment(id: string) {
        return commentsRepository.delete(id)
    }
}