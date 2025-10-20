import {Router} from "express"
import {inputErrorCheckValidator} from "../Infrastructure/Features/GlobalFeatures/inputCheckErrorValidator";
import {inputBlogsValidation} from "../Infrastructure/Features/Validators/blogsValidator";
import {authorizationCheck, blogsController, postsValidator} from "../composition-root";



export const blogRouter = Router({})

blogRouter.get('/', blogsController.returnAllBlogs.bind(blogsController))
blogRouter.post("/", authorizationCheck.base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator,blogsController.createBlog.bind(blogsController))
blogRouter.get("/:id",blogsController.findBlogById.bind(blogsController))
blogRouter.put("/:id", authorizationCheck.base64AuthorizationCheck,inputBlogsValidation(), inputErrorCheckValidator, blogsController.updateBlogById.bind(blogsController))
blogRouter.delete("/:id",authorizationCheck.base64AuthorizationCheck,blogsController.deleteBlogByID.bind(blogsController))
blogRouter.get("/:blogId/posts", blogsController.findPostsOfBlog.bind(blogsController))
blogRouter.post("/:blogId/posts", authorizationCheck.base64AuthorizationCheck,postsValidator.inputSpecifiedPostValidation(),inputErrorCheckValidator, blogsController.createPostForBlog.bind(blogsController))