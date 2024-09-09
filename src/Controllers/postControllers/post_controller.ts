import {posts} from "../../Repository/postRepositories/posts_repository";
import {Request, Response} from "express";
import {httpStatuses} from "../../settings";
import {createPostService, deletePostService, updatePostService} from "../../Services/postServices";

export const returnAllPostsController = async (req: Request, res: Response) => {
    const allPosts = await posts.findMany(req.query as {[key: string] : string | undefined})
    res
        .status(httpStatuses.OK_200)
        .json(allPosts)
}

export const inputPostController = async (req: Request, res: Response) => {
    const createdPost = await createPostService(req.body)
    if(createdPost) {
        res
            .status(httpStatuses.CREATED_201)
            .json(createdPost)
    }
}

export const findPostById = async (req: Request, res: Response) => {
    const neededPost = await posts.findPostById(req.params.id)

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