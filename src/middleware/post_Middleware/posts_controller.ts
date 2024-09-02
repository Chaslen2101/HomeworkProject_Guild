import {posts} from "./posts_repository";
import {Request, Response} from "express";
import {httpStatuses} from "../../settings";
import {postCollection} from "../../db/MongoDB";

export const returnAllPosts = async (req: Request, res: Response) => {
    const allPosts = await postCollection.find({},{projection:{_id: 0}}).toArray()
    res
        .status(httpStatuses.OK_200)
        .json(allPosts)
}

export const inputPostController = async (req: Request, res: Response) => {
    const newPostID = await posts.create(req.body)
    if(newPostID) {
        const newPost = await posts.find(newPostID)
        res
            .status(httpStatuses.CREATED_201)
            .json(newPost)
    }
}

export const findPostById = async (req: Request, res: Response) => {
    const neededPost = await posts.find(req.params.id)

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
    const neededPost = await posts.find(req.params.id)
    if (neededPost) {
        await posts.update(req.params.id, req.body)
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
    const neededPost = await posts.find(req.params.id)
    if (neededPost) {
        await posts.delete(req.params.id)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}