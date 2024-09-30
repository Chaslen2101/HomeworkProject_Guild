import {posts} from "../Repository/postsRepository";
import {postsInputType} from "../Types/Types";

export const postService = {

    async createPost (body: postsInputType, neededBlog: any) {
        return await posts.create(body, neededBlog)
    },

    async updatePost(id: string, body: postsInputType) {
        return await posts.update(id, body)
    },

    async deletePost (id: string) {
        return await posts.delete(id)
    }
}