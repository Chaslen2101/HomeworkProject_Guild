import {postsRepository} from "../Repository/postsRepository";
import {postsInputType} from "../Types/Types";


class PostsService {

    async createPost (body: postsInputType, neededBlog: any) {
        return await postsRepository.create(body, neededBlog)
    }

    async updatePost(id: string, body: postsInputType) {
        return await postsRepository.update(id, body)
    }

    async deletePost (id: string) {
        return await postsRepository.delete(id)
    }
}

export const postsService = new PostsService();