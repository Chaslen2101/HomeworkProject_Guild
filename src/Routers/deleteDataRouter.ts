import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {blogCollection, postCollection, userCollection} from "../db/MongoDB";

export const deleteAllRouter = Router({})

deleteAllRouter.delete("/",async (req: Request, res: Response) => {
    await blogCollection.drop()
    await postCollection.drop()
    await userCollection.drop()
    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})

})