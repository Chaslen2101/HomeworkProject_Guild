import {blog} from "../Repository/blogsRepository";
import {blogsInputType} from "../Types/Types";

export const blogService = {

    async createBlog (body: blogsInputType) {
        return await blog.create(body)
    },

    async updateBlog (id: string, body: blogsInputType) {
        return await blog.update(id, body)
    },

    async deleteBlog (id: string) {
        return await blog.delete(id)
    }
}
