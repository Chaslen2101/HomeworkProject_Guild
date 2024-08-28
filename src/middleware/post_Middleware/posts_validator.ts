import {body} from "express-validator";
import {blog} from "../blog_Middleware/blog_Repository";

export const inputPostsValidation = () => {
    return [
        body("title").trim().exists().withMessage("title is required")
            .isString().withMessage("title should be string")
            .isLength({max: 30}).withMessage("title should be less then 30 symbols"),
        body("shortDescription").trim().exists().withMessage("shortDescription is required")
            .isString().withMessage("shortDescription should be string")
            .isLength({max: 100}).withMessage("shortDescription should be less then 100 symbols"),
        body("content").trim().exists().withMessage("content is required")
            .isString().withMessage("content should be string")
            .isLength({max: 1000}).withMessage("content max length is 1000 symbols"),
        body("blogId").trim().exists().withMessage("blogId is required")
            .isString().withMessage("blogId should be string")
            .custom(inputBlogId => {
                const neededBlog = blog.find(inputBlogId)
                if (neededBlog) {
                    return true
                }
                throw new Error("there are no existing blogs with this ID")
            })
    ]

}