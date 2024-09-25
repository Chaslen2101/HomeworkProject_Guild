import {Router} from "express"
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {
    createBlogController, createPostForBlogController, deleteBlogByID,
    findBlogByIdController,findPostsOfBlogController, returnAllBlogsController,
    updateBlogById
} from "../Controllers/blog_controllers";
import {inputBlogsValidation} from "../Features/blogFeatures/blog_validator";
import {authorizationCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputSpecifiedPostValidation} from "../Features/postFeatures/postForSpecifiedBlog_validator";


export const blogRouter = Router({})

blogRouter.get('/', returnAllBlogsController)
blogRouter.post("/", authorizationCheck,inputBlogsValidation(), inputErrorCheckValidator,createBlogController)
blogRouter.get("/:id",findBlogByIdController)
blogRouter.put("/:id", authorizationCheck,inputBlogsValidation(), inputErrorCheckValidator, updateBlogById)
blogRouter.delete("/:id",authorizationCheck,deleteBlogByID)
blogRouter.get("/:BlogId/posts", findPostsOfBlogController)
blogRouter.post("/:blogId/posts", authorizationCheck,inputSpecifiedPostValidation(),inputErrorCheckValidator, createPostForBlogController)