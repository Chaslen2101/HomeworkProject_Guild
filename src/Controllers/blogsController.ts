import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {blogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {inputQueryType} from "../Types/Types";
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {blogsService} from "../Services/blogsServices";
import {postsService} from "../Services/postsServices";

class BlogsController {

    async returnAllBlogs (req: Request, res: Response){
        res
            .status(httpStatuses.OK_200)
            .json(await blogsQueryRep.findManyBlogs(req.query as { [key: string]: string | undefined }))
    }

    async createBlog (req: Request, res: Response){
        const createdBlogId = await blogsService.createBlog(req.body)
        res
            .status(httpStatuses.CREATED_201)
            .json(await blogsQueryRep.findBlogByID(createdBlogId))
    }

    async findBlogById (req: Request, res: Response) {
        const neededBlog = await blogsQueryRep.findBlogByID(req.params.id)
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

    async updateBlogById (req: Request, res: Response) {
        const isUpdated = await blogsService.updateBlog(req.params.id, req.body)
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

    async deleteBlogByID (req: Request, res: Response) {
        const isDeleted = await blogsService.deleteBlog(req.params.id)
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

    async findPostsOfBlog (req: Request, res: Response) {
        const neededBlog = await blogsQueryRep.findBlogByID(req.params.blogId)
        if (!neededBlog) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        } else {
            res
                .status(httpStatuses.OK_200)
                .json(await postsQueryRep.findManyPosts(req.query as inputQueryType, req.params.blogId))
        }
    }

    async createPostForBlog (req: Request, res: Response) {
        const neededBlog = await blogsQueryRep.findBlogByID(req.params.blogId)
        if (neededBlog) {
            const newPostId = await postsService.createPost(req.body, neededBlog)
            res
                .status(httpStatuses.CREATED_201)
                .json(await postsQueryRep.findPostById(newPostId))
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }
}

export const blogsController = new BlogsController()