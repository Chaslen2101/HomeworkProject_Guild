import {Request, Response} from "express";
import {blog} from "./blog_Repository";
import {httpStatuses} from "../../settings";
import {blogCollection} from "../../db/MongoDB";
// import {db} from "../../db/db";

export const returnAllBlogs = async (req: Request, res: Response) => {
    const allBlogs = await blogCollection.find({},{projection:{_id: 0}}).toArray()
    res
        .status(httpStatuses.OK_200)
        .json(allBlogs)
}

export const createBlogController = async (req: Request, res: Response) => {
    const isVideoCreated = await blog.create(req.body)
    if (isVideoCreated) {
        const newVideo = await blog.findByName(req.body.name)
        res
            .status(httpStatuses.CREATED_201)
            .json(newVideo)
    }
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
    const neededBlog = await blog.findByID(req.params.id)
    if (neededBlog) {
        await blog.update(req.params.id,req.body)
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
    const neededBlog = await blog.findByID(req.params.id)
    if (neededBlog) {
        await blog.delete(req.params.id)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}