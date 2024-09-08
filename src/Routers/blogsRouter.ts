import {Router} from "express"
import {inputErrorCheckValidator} from "../middleware/globalMiddleware/inputCheckErrorValidator";
import {
    createBlogController, createPostForSpecifiedBlog, deleteBlogByID,
    findBlogByIdController,findPostsOfSpecifiedBlog, returnAllBlogsController,
    updateBlogById
} from "../Controllers/blogControllers/blog_controllers";
import {inputBlogsValidation} from "../middleware/blog_Middleware/blog_validator";
import {authorizationCheck} from "../middleware/globalMiddleware/authorizationCheck";
import {inputSpecifiedPostValidation} from "../middleware/post_Middleware/postForSpecifiedBlog_validator";


export const blogRouter = Router({})

blogRouter.get('/', returnAllBlogsController)
blogRouter.post("/", authorizationCheck,inputBlogsValidation(), inputErrorCheckValidator,createBlogController)
blogRouter.get("/:id",findBlogByIdController)
blogRouter.put("/:id", authorizationCheck,inputBlogsValidation(), inputErrorCheckValidator, updateBlogById)
blogRouter.delete("/:id",authorizationCheck,deleteBlogByID)
blogRouter.get("/:blogId/posts", findPostsOfSpecifiedBlog)
blogRouter.post("/:blogId/posts", authorizationCheck,inputSpecifiedPostValidation(),inputErrorCheckValidator, createPostForSpecifiedBlog)