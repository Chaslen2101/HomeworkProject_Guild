import {commentCollection} from "../../db/MongoDB";
import {commentQueryType,commentViewType} from "../../Types/Types";
import {mapToView} from "../../Features/globalFeatures/helper";


class CommentsQueryRep {

    async findCommentById (id: string) {
        return await commentCollection.findOne({id: id}, {projection: {_id: 0}})
    }

    async findManyCommentsByPostId (postId: string, query: commentQueryType) {
        const items = await commentCollection.find({postId: postId}, {projection:{_id: 0}})
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.pageNumber - 1)* query.pageSize)
            .toArray()
        const totalCount = await commentCollection.countDocuments({postId: postId})
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

export const commentsQueryRep = new CommentsQueryRep();