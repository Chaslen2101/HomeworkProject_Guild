import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {createPostService, deletePostService, updatePostService} from "../Services/postServices";
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {blogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {inputQueryType} from "../Features/Types";

export const returnAllPostsController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await postsQueryRep.findMany(req.query as inputQueryType))
}

export const inputPostController = async (req: Request, res: Response) => {
    const neededBlog = await blogsQueryRep.findByID(req.body.blogId)
    if (neededBlog) {
        const createdPostId = await createPostService(req.body, neededBlog)
        res.status(httpStatuses.CREATED_201).json(await postsQueryRep.findPostById(createdPostId))
    }
}

export const findPostById = async (req: Request, res: Response) => {
    const neededPost = await postsQueryRep.findPostById(req.params.id)

    if(neededPost) {
        res
            .status(httpStatuses.OK_200)
            .json(neededPost)
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const updatePostByID = async (req: Request, res: Response) => {

    const isUpdated = await updatePostService(req.params.id,req.body)
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

export const deletePostById = async (req: Request, res: Response) => {
    const isDeleted = await deletePostService(req.params.id)
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