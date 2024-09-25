import {Router} from "express";
import {authorizationCheck} from "../Features/globalFeatures/authorizationCheck";
import {inputPostsValidation} from "../Features/postFeatures/posts_validator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {
    deletePostById,
    findPostById,
    inputPostController, returnAllPostsController,
    updatePostByID
} from "../Controllers/post_controller";

export const postsRouter = Router({})

postsRouter.get("/", returnAllPostsController)
postsRouter.post("/", authorizationCheck,inputPostsValidation(), inputErrorCheckValidator,inputPostController)
postsRouter.get("/:id", findPostById)
postsRouter.put("/:id", authorizationCheck, inputPostsValidation(), inputErrorCheckValidator,updatePostByID)
postsRouter.delete("/:id",authorizationCheck,deletePostById)