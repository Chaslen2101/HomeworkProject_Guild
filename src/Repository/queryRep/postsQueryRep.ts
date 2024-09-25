import {inputQueryType} from "../../Features/Types";
import {queryHelper} from "../../Features/helper";
import {postCollection} from "../../db/MongoDB";

export const postsQueryRep = {
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

    async findPostById(id: string) {
        return await postCollection.findOne({id: id}, {projection: {_id: 0}})
    },
}