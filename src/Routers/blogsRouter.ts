import {Router} from "express"
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {blogsController} from "../Controllers/blogsController";
import {inputBlogsValidation} from "../Features/validators/blogsValidator";
import {base64AuthorizationCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputSpecifiedPostValidation} from "../Features/validators/postsValidator";



export const blogRouter = Router({})

blogRouter.get('/', blogsController.returnAllBlogs)
blogRouter.post("/", base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator,blogsController.createBlog)
blogRouter.get("/:id",blogsController.findBlogById)
blogRouter.put("/:id", base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator, blogsController.updateBlogById)
blogRouter.delete("/:id",base64AuthorizationCheck,blogsController.deleteBlogByID)
blogRouter.get("/:blogId/posts", blogsController.findPostsOfBlog)
blogRouter.post("/:blogId/posts", base64AuthorizationCheck,inputSpecifiedPostValidation(),inputErrorCheckValidator, blogsController.createPostForBlog)