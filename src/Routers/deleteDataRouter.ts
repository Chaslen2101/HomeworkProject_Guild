import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {
    apiRequestInfoCollection,
    blogCollection,
    commentCollection,
    postCollection,
    refreshTokenCollection, sessionsCollection,
    userCollection
} from "../db/MongoDB";

export const deleteAllRouter = Router({})

deleteAllRouter.delete("/",async (req: Request, res: Response) => {
    await blogCollection.drop()
    await postCollection.drop()
    await userCollection.drop()
    await commentCollection.drop()
    await refreshTokenCollection.drop()
    await apiRequestInfoCollection.drop()
    await sessionsCollection.drop()
    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})

})