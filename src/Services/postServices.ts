import {posts} from "../Repository/postRepositories/posts_repository";
import {postsInputType} from "../db/Types";
import {blog} from "../Repository/blogRepositories/blog_Repository";


export const createPostService = async (body:postsInputType, blogId?: string) => {
        const id = body.blogId ? body.blogId : blogId
        const neededBlog = await blog.findByID(id!);
        if (neededBlog !== null) {
            const idOfNeededPost = await posts.create(body, neededBlog)
            return await posts.findPostById(idOfNeededPost)
        }else return undefined
    }

export const updatePostService = async (id:string, body: postsInputType) => {
    const neededPost = await posts.findPostById(id)
    if (neededPost) {
        await posts.update(id,body)
        return true
    }else return false
}

export const deletePostService = async (id:string) => {
    const neededPost = await posts.findPostById(id)
    if (neededPost) {
        await posts.delete(id)
        return true
    }else return false
}