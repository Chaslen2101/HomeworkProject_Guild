import {blog} from "../Repository/blogsRepository";
import {blogsInputType} from "../Features/Types";

export const createBlogService = async (body: blogsInputType) => {
    return await blog.create(body)
}

export const updateBlogService = async (id: string, body: blogsInputType) => {
    return await blog.update(id, body)
}

export const deleteBlogService = async (id: string) => {
    return await blog.delete(id)
}
