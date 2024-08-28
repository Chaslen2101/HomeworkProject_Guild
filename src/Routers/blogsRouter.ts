import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {db} from "../db/db";
import {inputErrorCheckValidator} from "../middleware/inputCheckErrorValidator";
import {
    createBlogController, deleteBlogByID,
    findBlogByIdController,
    updateBlogById
} from "../middleware/blog_Middleware/blog_controllers";
import {inputBlogsValidation} from "../middleware/blog_Middleware/blog_validator";
import {authorizationCheck} from "../middleware/authorizationCheck";
// import {fieldNamesType} from "../db/Types";

export const blogRouter = Router({})

blogRouter.get('/', (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(db.existingBlogs)
})

blogRouter.post("/", authorizationCheck, inputBlogsValidation, inputErrorCheckValidator,createBlogController)
blogRouter.get("/:id",findBlogByIdController)
blogRouter.put("/:id", authorizationCheck,inputBlogsValidation, inputErrorCheckValidator, updateBlogById)
blogRouter.delete("/:id",authorizationCheck,deleteBlogByID)