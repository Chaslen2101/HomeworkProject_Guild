import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {blogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {inputQueryType} from "../Types/Types";
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {blogService} from "../Services/blogServices";
import {postService} from "../Services/postServices";


export const returnAllBlogsController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await blogsQueryRep.findMany(req.query as { [key: string]: string | undefined }))
}

export const createBlogController = async (req: Request, res: Response) => {
    const createdBlogId = await blogService.createBlog(req.body)
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
    const isUpdated = await blogService.updateBlog(req.params.id, req.body)
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
    const isDeleted = await blogService.deleteBlog(req.params.id)
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
    const neededBlog = await blogsQueryRep.findByID(req.params.blogId)
    if (!neededBlog) {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }else {
        res
            .status(httpStatuses.OK_200)
            .json(await postsQueryRep.findMany(req.query as inputQueryType, req.params.blogId))
    }
}

export const createPostForBlogController = async (req: Request, res: Response) => {
    const neededBlog = await blogsQueryRep.findByID(req.params.blogId)
    if (neededBlog) {
        const newPostId = await postService.createPost(req.body, neededBlog)
        res
            .status(httpStatuses.CREATED_201)
            .json(await postsQueryRep.findPostById(newPostId))
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}