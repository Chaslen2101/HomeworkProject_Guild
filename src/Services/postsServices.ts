import {PostsRepository} from "../Repository/postsRepository";
import {BlogsClass, PostsInputType} from "../Types/Types";
import {inject, injectable} from "inversify";


@injectable()
export class PostsService {

    constructor(
        @inject(PostsRepository) protected postsRepository: PostsRepository
    ) {}

    async createPost (body: PostsInputType, blog: BlogsClass) {
        return await this.postsRepository.create(body, blog)
    }

    async updatePost(id: string, body: PostsInputType) {
        return await this.postsRepository.update(id, body)
    }

    async deletePost (id: string) {
        return await this.postsRepository.delete(id)
    }
}

