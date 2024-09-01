import {Router, Request, Response} from "express";
import {authorizationCheck} from "../middleware/authorizationCheck";
import {inputPostsValidation} from "../middleware/post_Middleware/posts_validator";
import {inputErrorCheckValidator} from "../middleware/inputCheckErrorValidator";
import {
    deletePostById,
    findPostById,
    inputPostController, returnAllPosts,
    updatePostByID
} from "../middleware/post_Middleware/posts_controller";

export const postsRouter = Router({})

postsRouter.get("/", returnAllPosts)
postsRouter.post("/", authorizationCheck,inputPostsValidation(), inputErrorCheckValidator,inputPostController)
postsRouter.get("/:id", findPostById)
postsRouter.put("/:id", authorizationCheck, inputPostsValidation(), inputErrorCheckValidator,updatePostByID)
postsRouter.delete("/:id",authorizationCheck,deletePostById)