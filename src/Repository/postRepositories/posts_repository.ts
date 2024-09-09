import {inputQueryType, postsInputType, postsViewType} from "../../db/Types";
import {postCollection} from "../../db/MongoDB";
import {queryHelper} from "../../db/helper";
import {ObjectId} from "mongodb";


export const posts = {

    async findPostById(id: string) {
        return await postCollection.findOne({id: id}, {projection: {_id: 0}})
    },

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
        await postCollection.updateOne({id: id}, {
            $set: {
                title: newInfo.title,
                shortDescription: newInfo.shortDescription,
                content: newInfo.content,
                blogId: newInfo.blogId
            }
        })
    },

    async delete(id: string) {
        await postCollection.deleteOne({id: id})
    },

    async findMany (query:inputQueryType, id?: string) {
        const sanitizedQuery = queryHelper(query)
        const filter = id ? {blogId: id} : {}
        const result = await postCollection.find(filter, {projection: {_id: 0}})
            .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
            .limit(sanitizedQuery.pageSize)
            .skip((sanitizedQuery.pageNumber-1)*sanitizedQuery.pageSize)
            .toArray()
        const totalCount = await postCollection.countDocuments(filter)
        return {
            pagesCount: Math.ceil(totalCount/sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: result
        }
    },

    // async returnAllPosts (query: inputQueryType) {
    //     const sanitizedQuery = queryHelper(query)
    //     const result = await postCollection.find({}, {projection: {_id: 0}})
    //         .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
    //         .limit(sanitizedQuery.pageSize)
    //         .skip((sanitizedQuery.pageNumber-1)*sanitizedQuery.pageSize)
    //         .toArray()
    //     const totalCount = await postCollection.countDocuments({})
    //     return {
    //         pagesCount: Math.ceil(totalCount/sanitizedQuery.pageSize),
    //         page: sanitizedQuery.pageNumber,
    //         pageSize: sanitizedQuery.pageSize,
    //         totalCount: totalCount,
    //         items: result
    //     }
    // }
}