import {blogsInputType, blogsViewType, inputQueryType} from "../../db/Types";
import {blogCollection} from "../../db/MongoDB";
import {queryHelper} from "../../db/helper";
import {ObjectId} from "mongodb";


export const blog = {

    async findMany(query: inputQueryType) {

        const sanitizedQuery = queryHelper(query)
        const filter = sanitizedQuery.searchNameTerm ? {name: {$regex: sanitizedQuery.searchNameTerm, $options: "i"}} : {}
        const items = await blogCollection.find(filter, {projection: {_id: 0}})
            .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
            .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
            .limit(sanitizedQuery.pageSize)
            .toArray()
        const totalCount = await blogCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount/sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: items
        }
    },

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

    async findByID(id: string) {
        return await blogCollection.findOne({id: id}, {projection: {_id: 0}})
    },

    async delete(id: string) {
        await blogCollection.deleteOne({id: id})
    },

    async update(id: string, newInfo: blogsInputType) {
        return await blogCollection.updateOne({id: id}, {
            $set: {
                name: newInfo.name,
                description: newInfo.description,
                websiteUrl: newInfo.websiteUrl
            }
        })
    }
};