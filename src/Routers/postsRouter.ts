import {Router} from "express";
import {authorizationCheck} from "../middleware/globalMiddleware/authorizationCheck";
import {inputPostsValidation} from "../middleware/post_Middleware/posts_validator";
import {inputErrorCheckValidator} from "../middleware/globalMiddleware/inputCheckErrorValidator";
import {
    deletePostById,
    findPostById,
    inputPostController, returnAllPostsController,
    updatePostByID
} from "../Controllers/postControllers/post_controller";

export const postsRouter = Router({})

postsRouter.get("/", returnAllPostsController)
postsRouter.post("/", authorizationCheck,inputPostsValidation(), inputErrorCheckValidator,inputPostController)
postsRouter.get("/:id", findPostById)
postsRouter.put("/:id", authorizationCheck, inputPostsValidation(), inputErrorCheckValidator,updatePostByID)
postsRouter.delete("/:id",authorizationCheck,deletePostById)