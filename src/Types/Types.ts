import {SortDirection} from "mongodb";

export type inputQueryType = {
    [key:string]: string | undefined
}

export type blogsViewType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
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

export type postsViewType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
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

export type userViewType = {
    id: string,
    login: string,
    email:string,
    createdAt: string
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

export type commentType = {
    id: string
    content: string
    commentatorInfo: commentatorInfoType,
    createdAt: string
    postId: string
}

export type commentContentType = {
    content: string
}

export type commentViewType = {
    id: string
    content: string
    commentatorInfo: commentatorInfoType,
    createdAt: string
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