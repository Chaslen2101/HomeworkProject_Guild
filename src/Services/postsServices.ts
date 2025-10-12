import {PostsRepository} from "../Repository/postsRepository";
import {PostsInputType} from "../Types/Types";
import {inject, injectable} from "inversify";


@injectable()
export class PostsService {

    constructor(
        @inject(PostsRepository) protected postsRepository: PostsRepository
    ) {}

    async createPost (body: PostsInputType, neededBlog: any) {
        return await this.postsRepository.create(body, neededBlog)
    }

    async updatePost(id: string, body: PostsInputType) {
        return await this.postsRepository.update(id, body)
    }

    async deletePost (id: string) {
        return await this.postsRepository.delete(id)
    }
}

