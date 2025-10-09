import {SortDirection} from "mongodb";
import mongoose, {Schema} from "mongoose";

export type inputQueryType = {
    [key: string]: string | undefined
}

export class BlogsClass {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: string,
        public isMembership: boolean
    ) {}
}

export const blogsSchema: Schema<BlogsClass> = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    websiteUrl: String,
    createdAt: String,
    isMembership: Boolean
})

export type blogsPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogsClass[]
}

export type blogsInputType = {
    name: string
    description: string
    websiteUrl: string
}

export type blogsPostsQueryType = {
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

export const postsSchema: Schema<PostsClass> = new mongoose.Schema ({
        id: String,
        title: String,
        shortDescription: String,
        content: String,
        blogId: String,
        blogName: String,
        createdAt: Date
})

export type postsInputType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type postsPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostsClass[]
}

export type inputUserType = {
    login: string,
    password: string,
    email: string
}

export type usersPagesType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: userViewType[]
}

export class UserClass {
    constructor(
        public id: string,
        public login: string,
        public email:string,
        public password: string,
        public createdAt: string,
        public emailConfirmationInfo: {
            confirmationCode: string | null,
            expirationDate: string,
            isConfirmed: boolean
        },
        public passwordRecoveryCode: {
            confirmationCode: null,
            expirationDate: string
        }
    ) {}
}


export const userSchema:Schema<UserClass> = new mongoose.Schema({
    id: String,
    login: String,
    email: String,
    password: String,
    createdAt: String,
    emailConfirmationInfo: {
        confirmationCode: String,
        expirationDate: String,
        isConfirmed: Boolean
    },
    passwordRecoveryCode: {
        confirmationCode: null,
        expirationDate: String
    }

})

export class userViewType {
    constructor(
        public id: string,
        public login: string,
        public email: string,
        public createdAt: string
    ) {
    }
}

export type userQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}

export type accessTokenPayload = {
    id: string,
    login: string
}

export type refreshTokenPayload = {
    deviceId: string,
    id: string,
    login: string
}

export const refreshTokenPayloadSchema: Schema<refreshTokenPayload> = new mongoose.Schema({
    deviceId: String,
    id: String,
    login: String
})

export type commentatorInfoType = {
    userId: string,
    userLogin: string
}

export class CommentsClass {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: commentatorInfoType,
        public createdAt: string,
        public postId: string,
    ) {}
}

export const commentsScheme: Schema<CommentsClass> = new mongoose.Schema ({
    id: String,
    content: String,
    commentatorInfo: {
        userId: String,
        userLogin: String
    },
    createdAt: String,
    postId: String,
})

export class commentViewType {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: commentatorInfoType,
        public createdAt: string
    ) {}
}

export type commentQueryType = {
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

export const sessionInfoSchema: Schema<SessionInfoClass> = new mongoose.Schema ({
    ip: String,
    title: String,
    lastActiveDate: Date,
    deviceId: String,
    userId: String,
})

export type sessionInfoViewType = {
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

export const apiRequestsInfoSchema: Schema<ApiRequestsInfoClass> = new mongoose.Schema({
    ip: String,
    URL: String,
    date: Date
})