import {blogsInputType, blogsViewType} from "../../db/Types";
import {blogCollection} from "../../db/MongoDB";


export const blog = {
    async create(newBlog: blogsInputType) {
        const createdBlog: blogsViewType = {
            id: new Date().toISOString() + Math.random(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogCollection.insertOne(createdBlog)
        return true
    },

    async findByID(id: string) {
        return await blogCollection.findOne({id: id}, {projection: {_id: 0}})
    },

    async findByName(name: string) {
        return await blogCollection.findOne({name: name},{projection: {_id: 0}})
    },

    async delete(id: string) {
        await blogCollection.deleteOne({id: id})
    },

    async update(id: string, newInfo: blogsInputType) {
        await blogCollection.updateOne({id: id}, {$set: {
                name: newInfo.name,
                description: newInfo.description,
                websiteUrl: newInfo.websiteUrl
            }})
    }
}