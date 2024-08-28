import {Request, Response} from "express";
import {blog} from "./blog_Repository";
import {httpStatuses} from "../../settings";
import {db} from "../../db/db";

export const createBlogController = (req: Request, res: Response) => {
    const newVideo = blog.create(req.body)
    res
        .status(httpStatuses.CREATED_201)
        .json(newVideo)
}

export const findBlogByIdController = (req: Request, res: Response) => {
    const neededBlog = blog.find(req.params.id)
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

export const updateBlogById = (req: Request, res: Response) => {
    const neededBlog = blog.find(req.params.id)
    if (neededBlog) {
        neededBlog.name = req.body.name
        neededBlog.description = req.body.description
        neededBlog.websiteUrl = req.body.websiteUrl
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const deleteBlogByID = (req: Request, res: Response) => {
    const neededBlog = blog.find(req.params.id)
    if (neededBlog) {
        const indexOfNeededBlog = db.existingBlogs.indexOf(neededBlog)
        blog.delete(indexOfNeededBlog)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}