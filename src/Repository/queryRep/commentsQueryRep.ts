import {commentsModel} from "../../db/MongoDB";
import {CommentPagesType, CommentQueryType, CommentsClass} from "../../Types/Types";
import {injectable} from "inversify";


@injectable()
export class CommentsQueryRep {

    async findCommentById (id: string): Promise<CommentsClass | null> {

        const comment: CommentsClass | null = await commentsModel.findOne({id: id}, {projection: {_id: 0}}).lean()
        if(!comment) {
            return null
        }else {
            return comment
        }
    }

    async findManyCommentsByPostId (postId: string, query: CommentQueryType): Promise<CommentPagesType> {

        const items = await commentsModel.find({postId: postId}, {projection:{_id: 0}})
            .sort({[query.sortBy]: query.sortDirection})
            .limit(query.pageSize)
            .skip((query.pageNumber - 1)* query.pageSize)
            .lean()
        const totalCount: number = await commentsModel.countDocuments({postId: postId})

        return {
            pagesCount: Math.ceil(totalCount/query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items
        }
    }
}