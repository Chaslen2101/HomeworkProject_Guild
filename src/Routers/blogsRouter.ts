import {Router} from "express"
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {
    createBlogController, createPostForBlogController, deleteBlogByID,
    findBlogByIdController,findPostsOfBlogController, returnAllBlogsController,
    updateBlogById
} from "../Controllers/blogControllers";
import {inputBlogsValidation} from "../Features/validators/blogValidator";
import {base64AuthorizationCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputSpecifiedPostValidation} from "../Features/validators/postValidator";



export const blogRouter = Router({})

blogRouter.get('/', returnAllBlogsController)
blogRouter.post("/", base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator,createBlogController)
blogRouter.get("/:id",findBlogByIdController)
blogRouter.put("/:id", base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator, updateBlogById)
blogRouter.delete("/:id",base64AuthorizationCheck,deleteBlogByID)
blogRouter.get("/:blogId/posts", findPostsOfBlogController)
blogRouter.post("/:blogId/posts", base64AuthorizationCheck,inputSpecifiedPostValidation(),inputErrorCheckValidator, createPostForBlogController)