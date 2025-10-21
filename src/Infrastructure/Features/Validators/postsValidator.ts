import {body} from "express-validator";
import {BlogsQueryRep} from "../../QueryRep/blogsQueryRep";
import {inject} from "inversify";
import {BlogsViewType} from "../../../Types/Types";



export class PostsValidator {

    constructor(
        @inject(BlogsQueryRep) protected blogsQueryRep: BlogsQueryRep
    ) {}

    inputPostsValidation = () => {
        return [
            body("title").trim().exists().withMessage("title is required")
                .isString().withMessage("title should be string")
                .isLength({min: 1, max: 30}).withMessage("title should be from 1 to 30 symbols"),
            body("shortDescription").trim().exists().withMessage("shortDescription is required")
                .isString().withMessage("shortDescription should be string")
                .isLength({min: 1, max: 100}).withMessage("shortDescription should be from 1 to 100 symbols"),
            body("content").trim().exists().withMessage("content is required")
                .isString().withMessage("content should be string")
                .isLength({min: 1, max: 1000}).withMessage("content should be from 1 to 1000 symbols"),
            body("blogId").trim().exists().withMessage("blogId is required")
                .isString().withMessage("blogId should be string")
                .custom(async inputBlogId => {
                    const neededBlog: BlogsViewType | null = await this.blogsQueryRep.findBlogByID(inputBlogId)
                    if (!neededBlog)
                        throw new Error("there are no existing blogs with this ID")
                })
        ]

    }

    inputSpecifiedPostValidation = () => {
        return [
            body("title").trim().exists().withMessage("title is required")
                .isString().withMessage("title should be string")
                .isLength({min: 1, max: 30}).withMessage("title should be from 1 to 30 symbols"),
            body("shortDescription").trim().exists().withMessage("shortDescription is required")
                .isString().withMessage("shortDescription should be string")
                .isLength({min: 1, max: 100}).withMessage("shortDescription should be from 1 to 100 symbols"),
            body("content").trim().exists().withMessage("content is required")
                .isString().withMessage("content should be string")
                .isLength({min: 1, max: 1000}).withMessage("content should be from 1 to 1000 symbols"),
        ]
    }

    likeStatusValidation = () => {
        return [
            body("likeStatus").exists().withMessage("likeStatus is required").isIn(["Like", "Dislike", "None"]).withMessage("Invalid like Status"),
        ]
    }
}