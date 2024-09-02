import {postsInputType, postsViewType} from "../../db/Types";
import {blogCollection, postCollection} from "../../db/MongoDB";

export const posts = {

    async find(id: string) {
        return await postCollection.findOne({id: id},{projection: {_id: 0}})
    },

    async create(inputData: postsInputType) {
        const neededBlog = await blogCollection.findOne({id: inputData.blogId})
        if (neededBlog) {
            const newPost:postsViewType = {
                id: new Date().toISOString() + Math.random(),
                title: inputData.title,
                shortDescription: inputData.shortDescription,
                content: inputData.content,
                blogId: inputData.blogId,
                blogName: neededBlog.name,
                createdAt: new Date().toISOString()
            }
            await postCollection.insertOne(newPost)
            return newPost.id
        }else {return undefined}
    },

    async update(id: string, newInfo: postsInputType) {
        await postCollection.updateOne({id: id},{$set:{
                title: newInfo.title,
                shortDescription: newInfo.shortDescription,
                content: newInfo.content,
                blogId: newInfo.blogId
            }})
    },

    async delete(id: string) {
        await postCollection.deleteOne({id: id})
    }
}