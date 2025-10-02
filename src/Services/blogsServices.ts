import {blogsRepository} from "../Repository/blogsRepository";
import {blogsInputType} from "../Types/Types";


class BlogService {

    async createBlog (body: blogsInputType) {
        return await blogsRepository.create(body)
    }

    async updateBlog (id: string, body: blogsInputType) {
        return await blogsRepository.update(id, body)
    }

    async deleteBlog (id: string) {
        return await blogsRepository.delete(id)
    }
}

export const blogsService = new BlogService();