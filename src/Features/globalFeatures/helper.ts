import {SortDirection, WithId} from "mongodb";
import bcrypt from "bcrypt"
import {commentViewType, existUserType, inputQueryType, userViewType} from "../../Types/Types";

export const queryHelper = {

    blogsPostsQuery (query: { [key: string]: string | undefined }) {
        return {
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : 'createdAt',
            sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
            searchNameTerm: query.searchNameTerm ? query.searchNameTerm : undefined,
        }
    },

    userQuery (query: inputQueryType) {
        return {
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : 'createdAt',
            sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
            searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
            searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
        }
    },

    commentsQuery (query: inputQueryType) {
        return {
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : "createdAt",
            sortDirection: query.sortDirection ? query.sortDirection as SortDirection : "desc"
        }
    }
}

export const hashHelper = {

    async hashNewPassword (password: string) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    },

    async comparePassword (hashedPassword: string, somePassword: string) {
        return await bcrypt.compare(somePassword, hashedPassword)
    }
}

export const mapToView = {

    mapComments (comments: any[]) {
        return comments.map(comment => {
            return new commentViewType(
                comment.id,
                comment.content,
                {
                    userId: comment.commentatorInfo.userId,
                    userLogin: comment.commentatorInfo.userLogin
                },
                comment.createdAt
            )
        })
    },

    mapComment (comment: any) {
        return {
            id: comment.id,
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
            },
            createdAt: comment.createdAt
        }
    },

    mapUsers (users: WithId<existUserType>[]) {
        return users.map(user => {
            return new userViewType(
                user.id,
                user.login,
                user.email,
                user.createdAt
                )
        })
    },

    mapUser (userData: any): userViewType {

        return new userViewType(
            userData.id,
            userData.login,
            userData.email,
            userData.createdAt
        )
    },
}





