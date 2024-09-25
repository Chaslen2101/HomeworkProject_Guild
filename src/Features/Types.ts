import {SortDirection} from "mongodb";

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
    createdAt: string
}

export type inputQueryType = {
    [key:string]: string | undefined
}

export type userQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}

export type blogsPostsQueryType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string | undefined,
}