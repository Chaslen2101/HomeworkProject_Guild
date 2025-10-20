import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {BlogsQueryRep} from "../Infrastructure/QueryRep/blogsQueryRep";
import {
    AccessTokenPayloadType,
    BlogsPagesType,
    BlogsViewType,
    InputQueryType,
    PostsPagesType
} from "../Types/Types";
import {PostsQueryRep} from "../Infrastructure/QueryRep/postsQueryRep";
import {BlogsService} from "../Application/Services/blogsServices";
import {PostsService} from "../Application/Services/postsServices";
import {inject} from "inversify";
import {jwtService} from "../Infrastructure/Features/GlobalFeatures/jwtService";

export class BlogsController {

    constructor(
        @inject(BlogsQueryRep) protected blogsQueryRep: BlogsQueryRep,
        @inject(PostsQueryRep) protected postsQueryRep: PostsQueryRep,
        @inject(BlogsService) protected blogsService: BlogsService,
        @inject(PostsService) protected postsService: PostsService
    ) {}

    async returnAllBlogs (req: Request, res: Response){

        const allBlogs: BlogsPagesType = await this.blogsQueryRep.findManyBlogs(req.query as InputQueryType)
        res
            .status(httpStatuses.OK_200)
            .json(allBlogs)
    }

    async createBlog (req: Request, res: Response){

        const createdBlogId: string = await this.blogsService.createBlog(req.body)
        const createdBlog: BlogsViewType | null = await this.blogsQueryRep.findBlogByID(createdBlogId)

        res
            .status(httpStatuses.CREATED_201)
            .json(createdBlog)
    }

    async findBlogById (req: Request, res: Response) {

        const neededBlog: BlogsViewType | null = await this.blogsQueryRep.findBlogByID(req.params.id)
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

        try {

            await this.blogsService.updateBlog(req.params.id, req.body)
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})

        } catch (e) {

            if (e === "Cant find needed blog") {
                res
                    .status(httpStatuses.NOT_FOUND_404)
                    .json({})
            }
        }
    }

    async deleteBlogByID (req: Request, res: Response) {

        const isDeleted: boolean = await this.blogsService.deleteBlog(req.params.id)
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

        const neededBlog: BlogsViewType | null = await this.blogsQueryRep.findBlogByID(req.params.blogId)
        if (!neededBlog) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        } else {

            const isTokenExist: AccessTokenPayloadType | null = req.headers.authorization ? await jwtService.verifyAccessToken(req.headers.authorization.split(" ")[1]) : null
            const userId: string = isTokenExist ? isTokenExist.id : ""

            const postsOfBlog: PostsPagesType = await this.postsQueryRep.findManyPosts(req.query as InputQueryType, req.params.blogId, userId)
            res
                .status(httpStatuses.OK_200)
                .json(postsOfBlog)
        }
    }

    async createPostForBlog (req: Request, res: Response) {

        const neededBlog: BlogsViewType | null = await this.blogsQueryRep.findBlogByID(req.params.blogId)
        if (neededBlog) {

            const newPostId: string = await this.postsService.createPost(req.body)
            await this.postsQueryRep.findPostById(newPostId, req.user.id)

            res
                .status(httpStatuses.CREATED_201)
                .json()
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})
        }
    }
}