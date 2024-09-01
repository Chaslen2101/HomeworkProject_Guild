import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {inputErrorCheckValidator} from "../middleware/inputCheckErrorValidator";
import {
    createBlogController, deleteBlogByID,
    findBlogByIdController, returnAllBlogs,
    updateBlogById
} from "../middleware/blog_Middleware/blog_controllers";
import {inputBlogsValidation} from "../middleware/blog_Middleware/blog_validator";
import {authorizationCheck} from "../middleware/authorizationCheck";
import {blogCollection} from "../db/MongoDB";
// import {fieldNamesType} from "../db/Types";

export const blogRouter = Router({})

blogRouter.get('/', returnAllBlogs)
blogRouter.post("/", authorizationCheck, ...inputBlogsValidation(), inputErrorCheckValidator,createBlogController)
blogRouter.get("/:id",findBlogByIdController)
blogRouter.put("/:id", authorizationCheck,...inputBlogsValidation(), inputErrorCheckValidator, updateBlogById)
blogRouter.delete("/:id",authorizationCheck,deleteBlogByID)