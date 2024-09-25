import {posts} from "../Repository/postsRepository";
import {blogsViewType, postsInputType} from "../Features/Types";

export const createPostService = async (body:postsInputType, neededBlog: blogsViewType) => {
        return await posts.create(body, neededBlog)
    }

export const updatePostService = async (id:string, body: postsInputType) => {
        return await posts.update(id,body)
}

export const deletePostService = async (id:string) => {
        return await posts.delete(id)
}