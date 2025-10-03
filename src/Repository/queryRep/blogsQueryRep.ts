import {blogsPostsQueryType,inputQueryType} from "../../Types/Types";
import {queryHelper} from "../../Features/globalFeatures/helper";
import {blogCollection} from "../../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class BlogsQueryRep {

    async findManyBlogs(query: inputQueryType) {

        const sanitizedQuery: blogsPostsQueryType = queryHelper.blogsPostsQuery(query)
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
    }

    async findBlogByID(id: string) {
        return await blogCollection.findOne({id: id}, {projection: {_id: 0}})
    }
}