import {posts} from "./posts_repository";
import {postsViewType} from "../../db/Types";
import {Request, Response} from "express";
import {httpStatuses} from "../../settings";
import {db} from "../../db/db";

export const inputPostController = (req: Request, res: Response) => {
    const newPost:postsViewType = posts.create(req.body)
    res
        .status(httpStatuses.CREATED_201)
        .json(newPost)
}

export const findPostById = (req: Request, res: Response) => {
    const neededPost = posts.find(req.params.id)

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

export const updatePostByID = (req: Request, res: Response) => {
    const neededPost = posts.find(req.params.id)
    if (neededPost) {
        posts.update(req.body, req.params.id, neededPost)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const deletePostById = (req: Request, res: Response) => {
    const neededPost = posts.find(req.params.id)
    if (neededPost) {
        const indexOfPost = db.existingPosts.indexOf(neededPost)
        posts.delete(indexOfPost)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}