import {Router, Request, Response} from "express";
import {httpStatuses} from "../settings";
import {db} from "../db/db";
import {authorizationCheck} from "../middleware/authorizationCheck";
import {inputPostsValidation} from "../middleware/post_Middleware/posts_validator";
import {inputErrorCheckValidator} from "../middleware/inputCheckErrorValidator";
import {
    deletePostById,
    findPostById,
    inputPostController,
    updatePostByID
} from "../middleware/post_Middleware/posts_controller";

export const postsRouter = Router({})

postsRouter.get("/", (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(db.existingPosts)
})

postsRouter.post("/", authorizationCheck,...inputPostsValidation(), inputErrorCheckValidator,inputPostController)
postsRouter.get("/:id", findPostById)
postsRouter.put("/:id", authorizationCheck, ...inputPostsValidation(), inputErrorCheckValidator,updatePostByID)
postsRouter.delete("/:id",authorizationCheck,deletePostById)