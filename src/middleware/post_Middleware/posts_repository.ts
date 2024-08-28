import {postsInputType, postsViewType} from "../../db/Types";
import {db} from "../../db/db";
import {blog} from "../blog_Middleware/blog_Repository";

export const posts = {

    find(id: string) {
        return db.existingPosts.find(posts => posts.id === id)
    },

    create(inputData: postsInputType) {
        const neededBlogName = blog.find(inputData.blogId)!
        const newPost = {
            id: new Date().toISOString() + Math.random(),
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: inputData.blogId,
            blogName: neededBlogName.name
        }

        db.existingPosts.push(newPost)
        return newPost
    },

    update(inputData: postsInputType, id: string, neededPost: postsViewType) {
            neededPost.title = inputData.title
            neededPost.shortDescription = inputData.shortDescription
            neededPost.content = inputData.content
            neededPost.blogId = inputData.blogId
    },

    delete(indexOfPost: number) {
        db.existingPosts.splice(indexOfPost, 1)
    }

}