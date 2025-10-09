import {blogsPostsQueryType, inputQueryType, postsPagesType, PostsClass} from "../../Types/Types";
import {queryHelper} from "../../Features/globalFeatures/helper";
import {postsModel} from "../../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class PostsQueryRep {

    async findManyPosts (query:inputQueryType, id?: string): Promise<postsPagesType> {
        const sanitizedQuery: blogsPostsQueryType = queryHelper.blogsPostsQuery(query)
        const filter: {blogId:string} | string | {} = query.blogId ? {blogId: query.blogId} : id ? {blogId: id} : {}
        const result = await postsModel.find(filter, {projection: {_id: 0}})
            .sort({[sanitizedQuery.sortBy]: sanitizedQuery.sortDirection})
            .limit(sanitizedQuery.pageSize)
            .skip((sanitizedQuery.pageNumber-1)*sanitizedQuery.pageSize)
            .lean()
        const totalCount = await postsModel.countDocuments(filter)
        return {
            pagesCount: Math.ceil(totalCount/sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: result
        }
    }

    async findPostById(id: string): Promise<PostsClass | null> {
        return await postsModel.findOne({id: id}, {projection: {_id: 0}})
    }
}