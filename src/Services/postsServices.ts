import {PostsRepository} from "../Repository/postsRepository";
import {postsInputType} from "../Types/Types";
import {inject, injectable} from "inversify";


@injectable()
export class PostsService {

    constructor(
        @inject(PostsRepository) protected postsRepository: PostsRepository
    ) {}

    async createPost (body: postsInputType, neededBlog: any) {
        return await this.postsRepository.create(body, neededBlog)
    }

    async updatePost(id: string, body: postsInputType) {
        return await this.postsRepository.update(id, body)
    }

    async deletePost (id: string) {
        return await this.postsRepository.delete(id)
    }
}

