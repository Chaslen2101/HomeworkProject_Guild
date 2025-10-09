import {commentsModel} from "../../db/MongoDB";
import {commentQueryType, CommentsClass, commentViewType} from "../../Types/Types";
import {mapToView} from "../../Features/globalFeatures/helper";
import {injectable} from "inversify";


@injectable()
export class CommentsQueryRep {

    async findCommentById (id: string): Promise<CommentsClass | null> {
        return await commentsModel.findOne({id: id}, {projection: {_id: 0}})
    }

    async findManyCommentsByPostId (postId: string, query: commentQueryType) {
        const items = await commentsModel.find({postId: postId}, {projection:{_id: 0}})
            .sort({[query.sortBy]: query.sortDirection})
            .limit(query.pageSize)
            .skip((query.pageNumber - 1)* query.pageSize)
            .lean()
        const totalCount: number = await commentsModel.countDocuments({postId: postId})
        const comments: commentViewType[] = mapToView.mapComments(items)
        return {
            pagesCount: Math.ceil(totalCount/query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: comments
        }
    }
}