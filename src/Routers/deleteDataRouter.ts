import {Router} from "express"
import {db} from "../db/db";
import {Request, Response} from "express";
import {httpStatuses} from "../settings";

export const deleteAllRouter = Router({})

deleteAllRouter.delete("/",(req: Request, res: Response) => {
    db.existingBlogs = []
    res
        .status(httpStatuses.NO_CONTENT_204)
        .send()

})