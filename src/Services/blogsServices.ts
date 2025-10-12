import {BlogsInputType} from "../Types/Types";
import {BlogsRepository} from "../Repository/blogsRepository";
import {inject, injectable} from "inversify";


@injectable()
export class BlogService {

    constructor(
        @inject(BlogsRepository) protected blogsRepository: BlogsRepository
    ) {}

    async createBlog (body: BlogsInputType) {
        return await this.blogsRepository.create(body)
    }

    async updateBlog (id: string, body: BlogsInputType) {
        return await this.blogsRepository.update(id, body)
    }

    async deleteBlog (id: string) {
        return await this.blogsRepository.delete(id)
    }
}

