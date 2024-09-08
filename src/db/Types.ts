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

export type DB_Type = {
    existingBlogs: blogsViewType[]
    existingPosts: postsViewType[]
}

export type inputQueryType = {
    [key:string]: string | undefined
}
// export type fieldNamesType = keyof blogsInputType | keyof postsInputType