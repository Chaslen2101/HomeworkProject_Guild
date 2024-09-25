import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {createBlogService,deleteBlogService,updateBlogService} from "../Services/blogServices";
import {createPostService} from "../Services/postServices";
import {blogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {inputQueryType} from "../Features/Types";
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";


export const returnAllBlogsController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await blogsQueryRep.findMany(req.query as { [key: string]: string | undefined }))
}

export const createBlogController = async (req: Request, res: Response) => {
    const createdBlogId = await createBlogService(req.body)
    res
        .status(httpStatuses.CREATED_201)
        .json(await blogsQueryRep.findByID(createdBlogId))
}

export const findBlogByIdController = async (req: Request, res: Response) => {
    const neededBlog = await blogsQueryRep.findByID(req.params.id)
    if (neededBlog) {
        res
            .status(httpStatuses.OK_200)
            .json(neededBlog)
    } else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const updateBlogById = async (req: Request, res: Response) => {
    const isUpdated = await updateBlogService(req.params.id, req.body)
    if (isUpdated) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    } else {
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
    } else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const findPostsOfBlogController = async (req: Request, res: Response) => {
    const neededBlog = await blogsQueryRep.findByID(req.params.id)
    if (!neededBlog) res.status(httpStatuses.NOT_FOUND_404).json({})
    res.status(httpStatuses.OK_200).json(await postsQueryRep.findMany(req.query as inputQueryType, req.params.id))
}

export const createPostForBlogController = async (req: Request, res: Response) => {
    const neededBlog = await blogsQueryRep.findByID(req.params.id)
    if (neededBlog) {
        const newPostId = await createPostService(req.body, neededBlog)
        res.status(httpStatuses.CREATED_201).json(await postsQueryRep.findPostById(newPostId))
    }
    res.status(httpStatuses.NOT_FOUND_404).json({})
}