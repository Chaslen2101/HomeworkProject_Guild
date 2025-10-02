import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {postsQueryRep} from "../Repository/queryRep/postsQueryRep";
import {blogsQueryRep} from "../Repository/queryRep/blogsQueryRep";
import {inputQueryType} from "../Types/Types";
import {postsService} from "../Services/postsServices";


class PostsController {

    async returnAllPosts (req: Request, res: Response){
        res
            .status(httpStatuses.OK_200)
            .json(await postsQueryRep.findManyPosts(req.query as inputQueryType))
    }

    async inputPost (req: Request, res: Response) {
        const neededBlog = await blogsQueryRep.findBlogByID(req.body.blogId)
        if (neededBlog) {
            const createdPostId = await postsService.createPost(req.body, neededBlog)
            res
                .status(httpStatuses.CREATED_201)
                .json(await postsQueryRep.findPostById(createdPostId))
        }
    }

    async findPostById (req: Request, res: Response){
        const neededPost = await postsQueryRep.findPostById(req.params.id)

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

        const isUpdated = await postsService.updatePost(req.params.id, req.body)
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
        const isDeleted = await postsService.deletePost(req.params.id)
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

export const postsController = new PostsController()