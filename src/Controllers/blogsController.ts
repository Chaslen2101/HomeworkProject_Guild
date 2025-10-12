import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {BlogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {InputQueryType} from "../Types/Types";
import {PostsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {BlogService} from "../Services/blogsServices";
import {PostsService} from "../Services/postsServices";
import {inject} from "inversify";

export class BlogsController {

    constructor(
        @inject(BlogsQueryRep) protected blogsQueryRep: BlogsQueryRep,
        @inject(PostsQueryRep) protected postsQueryRep: PostsQueryRep,
        @inject(BlogService) protected blogsService: BlogService,
        @inject(PostsService) protected postsService: PostsService
    ) {}

    async returnAllBlogs (req: Request, res: Response){
        res
            .status(httpStatuses.OK_200)
            .json(await this.blogsQueryRep.findManyBlogs(req.query as { [key: string]: string | undefined }))
    }

    async createBlog (req: Request, res: Response){
        const createdBlogId = await this.blogsService.createBlog(req.body)
        res
            .status(httpStatuses.CREATED_201)
            .json(await this.blogsQueryRep.findBlogByID(createdBlogId))
    }

    async findBlogById (req: Request, res: Response) {
        const neededBlog = await this.blogsQueryRep.findBlogByID(req.params.id)
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
        const isUpdated = await this.blogsService.updateBlog(req.params.id, req.body)
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
        const isDeleted = await this.blogsService.deleteBlog(req.params.id)
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
        const neededBlog = await this.blogsQueryRep.findBlogByID(req.params.blogId)
        if (!neededBlog) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        } else {
            res
                .status(httpStatuses.OK_200)
                .json(await this.postsQueryRep.findManyPosts(req.query as InputQueryType, req.params.blogId))
        }
    }

    async createPostForBlog (req: Request, res: Response) {
        const neededBlog = await this.blogsQueryRep.findBlogByID(req.params.blogId)
        if (neededBlog) {
            const newPostId = await this.postsService.createPost(req.body, neededBlog)
            res
                .status(httpStatuses.CREATED_201)
                .json(await this.postsQueryRep.findPostById(newPostId))
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }
}