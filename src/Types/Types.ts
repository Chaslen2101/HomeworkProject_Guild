import {SortDirection} from "mongodb";
import mongoose, {Schema} from "mongoose";

export type InputQueryType = {
    [key: string]: string | undefined
}

export class BlogsClass {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: Date,
        public isMembership: boolean
    ) {}
}

export const BlogsSchema: Schema<BlogsClass> = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    websiteUrl: String,
    createdAt: Schema.Types.Date,
    isMembership: Boolean
})

export type BlogsPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogsClass[]
}

export type BlogsInputType = {
    name: string
    description: string
    websiteUrl: string
}

export type BlogsPostsQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string | undefined,
}

export class PostsClass {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: Date
    ) {}
}

export const PostsSchema: Schema<PostsClass> = new mongoose.Schema ({
        id: String,
        title: String,
        shortDescription: String,
        content: String,
        blogId: String,
        blogName: String,
        createdAt: Schema.Types.Date
})

export type PostsInputType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type PostsPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostsClass[]
}

export type InputUserType = {
    login: string,
    password: string,
    email: string
}

export type UsersPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserViewType[]
}

export class UserClass {
    constructor(
        public id: string,
        public login: string,
        public email:string,
        public password: string,
        public createdAt: Date,
        public emailConfirmationInfo: {
            confirmationCode: string | null,
            expirationDate: Date,
            isConfirmed: boolean
        },
        public passwordRecoveryCode: {
            confirmationCode: string,
            expirationDate: Date
        }
    ) {}
}


export const UserSchema:Schema<UserClass> = new mongoose.Schema({
    id: String,
    login: String,
    email: String,
    password: String,
    createdAt: Schema.Types.Date,
    emailConfirmationInfo: {
        confirmationCode: String,
        expirationDate: Schema.Types.Date,
        isConfirmed: Boolean
    },
    passwordRecoveryCode: {
        confirmationCode: String,
        expirationDate: Schema.Types.Date
    }

})

export class UserViewType {
    constructor(
        public id: string,
        public login: string,
        public email: string,
        public createdAt: Date
    ) {
    }
}

export type UserQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}

export type AccessTokenPayload = {
    id: string,
    login: string
}

export type RefreshTokenPayload = {
    deviceId: string,
    id: string,
    login: string
}

export const RefreshTokenPayloadSchema: Schema<RefreshTokenPayload> = new mongoose.Schema({
    deviceId: String,
    id: String,
    login: String
})

export type CommentatorInfoType = {
    userId: string,
    userLogin: string
}

export class CommentsClass {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: CommentatorInfoType,
        public createdAt: Date,
        public postId: string,
        public likesInfo: {
            likedBy: string[],
            dislikedBy: string[]
        }
    ) {}
}

export const CommentsScheme: Schema<CommentsClass> = new mongoose.Schema ({
    id: String,
    content: String,
    commentatorInfo: {
        userId: String,
        userLogin: String
    },
    createdAt: Schema.Types.Date,
    postId: String,
    likesInfo: {
        likedBy: [String],
        dislikedBy: [String]
    }
})

export class CommentsViewClass {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: CommentatorInfoType,
        public createdAt: Date,
        public likesInfo: {
            likesCount: number,
            dislikesCount: number,
            myStatus: string
        }

    ) {}
}

export type CommentsPagesType<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T
}

export type CommentsQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection
}

export class SessionInfoClass {
    constructor(
        public ip: string | undefined,
        public title: string | undefined,
        public lastActiveDate: Date,
        public deviceId: string,
        public userId: string,
    ) {}
}

export const SessionInfoSchema: Schema<SessionInfoClass> = new mongoose.Schema ({
    ip: String,
    title: String,
    lastActiveDate: Schema.Types.Date,
    deviceId: String,
    userId: String,
})

export type SessionInfoViewType = {
    ip: string | undefined,
    title: string | undefined,
    lastActiveDate: Date,
    deviceId: string,
}

export class ApiRequestsInfoClass {
    constructor(
        public ip: string | undefined,
        public URL: string,
        public date: Date
    ) {}
}

export const ApiRequestsInfoSchema: Schema<ApiRequestsInfoClass> = new mongoose.Schema({
    ip: String,
    URL: String,
    date: Schema.Types.Date,
})