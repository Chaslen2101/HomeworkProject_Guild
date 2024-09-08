import {Request, Response} from "express";
import {blog} from "../../Repository/blogRepositories/blog_Repository";
import {httpStatuses} from "../../settings";
import {
    allPostsInBlogService,
    createBlogService,
    deleteBlogService,
    updateBlogService
} from "../../Services/blogServices";
import {createPostService} from "../../Services/postServices";


export const returnAllBlogsController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await blog.findMany(req.query as {[key: string]: string | undefined}))
}

export const createBlogController = async (req: Request, res: Response) => {
        res
            .status(httpStatuses.CREATED_201)
            .json(await createBlogService(req.body))
}

export const findBlogByIdController = async (req: Request, res: Response) => {
    const neededBlog = await blog.findByID(req.params.id)
    if (neededBlog) {
        res
            .status(httpStatuses.OK_200)
            .json(neededBlog)
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const updateBlogById = async (req: Request, res: Response) => {
    const isUpdated = await updateBlogService(req.params.id,req.body)
    if (isUpdated) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const deleteBlogByID = async (req: Request, res: Response) => {
    const isDeleted = await deleteBlogService(req.params.id)
    if (isDeleted) {

        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const findPostsOfSpecifiedBlog = async (req:Request, res: Response) => {
    const neededPosts = await allPostsInBlogService(req.params.blogId, req.query as {[key:string]: string | undefined})
    if (neededPosts) {
        res
            .status(httpStatuses.OK_200)
            .json(neededPosts)
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const createPostForSpecifiedBlog = async (req: Request, res: Response) => {

    const newPost = await createPostService(req.body,req.params.blogId)
    if (newPost) {
        res
            .status(httpStatuses.CREATED_201)
            .json(newPost)
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}