import {SortDirection} from "mongodb";

export type inputQueryType = {
    [key:string]: string | undefined
}

export class blogsViewType  {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: string,
        public isMembership: boolean
    ) {}
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

export class postsViewType {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string
        ) {}
}

export type postsInputType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type userLoginInputType = {
    loginOrEmail: string,
    password: string
}

export class userViewType {
    constructor(
        public id: string,
        public login: string,
        public email:string,
        public createdAt: string
        ) {}

}

export type inputUserType = {
    login: string,
    password: string,
    email: string
}

export type existUserType = {
    id: string,
    login: string,
    email:string,
    password: string,
    createdAt: string,
    emailConfirmationInfo: {
        confirmationCode: string | null,
        expirationDate: Date,
        isConfirmed: boolean
    },
}

export type userInfoForTokenType = {
    id: string,
    login: string
}

export type userQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}

export type commentatorInfoType = {
    userId: string,
    userLogin: string
}

export class existCommentType {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: commentatorInfoType,
        public createdAt: string,
        public postId: string,
    ) {}

}

export type commentContentType = {
    content: string
}

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

export type refreshTokenInfoType = {
    id: string,
    login: string,
    deviceId: string
}