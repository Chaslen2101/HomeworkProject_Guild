import {blog} from "../Repository/blogRepositories/blog_Repository";
import {blogsInputType, inputQueryType} from "../db/Types";
import {posts} from "../Repository/postRepositories/posts_repository";


export const createBlogService = async (body: blogsInputType) => {
    const newBlogId = await blog.create(body)
    return await blog.findByID(newBlogId)
}

export const updateBlogService = async (id:string, body: blogsInputType) => {
   const result = await blog.update(id,body)
    return result.modifiedCount !== 0;
}

export const deleteBlogService = async (id:string) => {
    const neededBlog = await blog.findByID(id)
    if (neededBlog) {
        await blog.delete(id)
        return true
    }else return false
}

export const allPostsInBlogService = async (id:string, query: inputQueryType) => {
    const neededBlog = await blog.findByID(id)
    if (neededBlog) {
        return await posts.findMany(query,id)
    }else return undefined
}