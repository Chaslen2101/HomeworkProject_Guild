import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {PostsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {BlogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {InputQueryType} from "../Types/Types";
import {PostsService} from "../Services/postsServices";
import {inject} from "inversify";


export class PostsController {

    constructor(
        @inject(PostsQueryRep )protected postsQueryRep: PostsQueryRep,
        @inject(BlogsQueryRep) protected blogsQueryRep: BlogsQueryRep,
        @inject(PostsService) protected postsService: PostsService
    ){}

    async returnAllPosts (req: Request, res: Response){
        res
            .status(httpStatuses.OK_200)
            .json(await this.postsQueryRep.findManyPosts(req.query as InputQueryType))
    }

    async inputPost (req: Request, res: Response) {
        const neededBlog = await this.blogsQueryRep.findBlogByID(req.body.blogId)
        if (neededBlog) {
            const createdPostId = await this.postsService.createPost(req.body, neededBlog)
            res
                .status(httpStatuses.CREATED_201)
                .json(await this.postsQueryRep.findPostById(createdPostId))
        }
    }

    async findPostById (req: Request, res: Response){
        const neededPost = await this.postsQueryRep.findPostById(req.params.id)

        if (neededPost) {
            res
                .status(httpStatuses.OK_200)
                .json(neededPost)
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }

    async updatePostByID (req: Request, res: Response){

        const isUpdated = await this.postsService.updatePost(req.params.id, req.body)
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

    async deletePostById (req: Request, res: Response){
        const isDeleted = await this.postsService.deletePost(req.params.id)
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
}