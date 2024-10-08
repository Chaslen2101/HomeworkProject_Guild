import {blogsInputType, blogsViewType} from "../Types/Types";
import {blogCollection} from "../db/MongoDB";
import {ObjectId} from "mongodb";


export const blog = {

    async create(newBlog: blogsInputType) {
        const createdBlog: blogsViewType = {
            id: new ObjectId().toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogCollection.insertOne(createdBlog)
        return createdBlog.id
    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({id: id})
        return result.deletedCount !== 0
    },

    async update(id: string, newInfo: blogsInputType) {
        const result = await blogCollection.updateOne({id: id}, {
            $set: {
                name: newInfo.name,
                description: newInfo.description,
                websiteUrl: newInfo.websiteUrl
            }
        })
        return result.modifiedCount !== 0
    }
};