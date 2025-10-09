import {CommentsClass, userViewType} from "../Types/Types";
import {CommentsRepository} from "../Repository/commentsRepository";
import {inject, injectable} from "inversify";


@injectable()
export class CommentsService {

    constructor(
        @inject(CommentsRepository) protected commentsRepository: CommentsRepository
    ) {}

    async createComment(comment:CommentsClass, userInfo: userViewType, postId: string) {
        return await this.commentsRepository.create(comment, userInfo, postId)
    }
    async updateComment(comment: CommentsClass, id: string){
        return await this.commentsRepository.updateComment(comment,id)
    }
    async deleteComment(id: string) {
        return this.commentsRepository.deleteComment(id)
    }
}
