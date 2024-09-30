import {postsInputType, postsViewType} from "../Types/Types";
import {postCollection} from "../db/MongoDB";
import {ObjectId} from "mongodb";


export const posts = {

    async create(inputData: postsInputType, blog: any) {

        const newPost: postsViewType = {
            id: new ObjectId().toString(),
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        await postCollection.insertOne(newPost)
        return newPost.id
    },

    async update(id: string, newInfo: postsInputType) {
        const result = await postCollection.updateOne({id: id}, {
            $set: {
                title: newInfo.title,
                shortDescription: newInfo.shortDescription,
                content: newInfo.content,
                blogId: newInfo.blogId
            }
        })
        return result.modifiedCount !== 0
    },

    async delete(id: string) {
        const result = await postCollection.deleteOne({id: id})
        return result.deletedCount !== 0
    },

}