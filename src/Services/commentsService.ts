import {commentContentType, userViewType} from "../Types/Types";
import {CommentsRepository} from "../Repository/commentsRepository";
import {inject, injectable} from "inversify";


@injectable()
export class CommentsService {

    constructor(
        @inject(CommentsRepository) protected commentsRepository: CommentsRepository
    ) {}

    async createComment(comment:commentContentType, userInfo: userViewType, postId: string) {
        return await this.commentsRepository.create(comment, userInfo, postId)
    }
    async updateComment(comment: commentContentType, id: string){
        return await this.commentsRepository.update(comment,id)
    }
    async deleteComment(id: string) {
        return this.commentsRepository.delete(id)
    }
}
