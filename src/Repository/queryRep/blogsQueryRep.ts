import {BlogsClass, blogsPagesType, blogsPostsQueryType, inputQueryType} from "../../Types/Types";
import {queryHelper} from "../../Features/globalFeatures/helper";
import {blogsModel} from "../../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class BlogsQueryRep {

    async findManyBlogs(query: inputQueryType): Promise<blogsPagesType> {

        const sanitizedQuery: blogsPostsQueryType = queryHelper.blogsPostsQuery(query)
        const filter = sanitizedQuery.searchNameTerm ? {name: {$regex: sanitizedQuery.searchNameTerm, $options: "i"}} : {}
        const items: BlogsClass[] | null = await blogsModel.find(filter, {projection: {_id: 0}})
            .sort({[sanitizedQuery.sortBy]: sanitizedQuery.sortDirection})
            .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
            .limit(sanitizedQuery.pageSize)
            .lean()
        const totalCount: number = await blogsModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount/sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: items
        }
    }

    async findBlogByID(id: string): Promise<BlogsClass | null> {
        return await blogsModel.findOne({id: id}, {projection: {_id: 0}})
    }
}