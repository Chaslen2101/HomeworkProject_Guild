import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {
    apiRequestsInfoModel,
    blogsModel,
    commentsModel,
    postsModel,
    refreshTokenModel, sessionsModel,
    usersModel
} from "../db/MongoDB";

export const deleteAllRouter = Router({})

deleteAllRouter.delete("/",async (req: Request, res: Response) => {
    await blogsModel.deleteMany()
    await postsModel.deleteMany()
    await usersModel.deleteMany()
    await commentsModel.deleteMany()
    await refreshTokenModel.deleteMany()
    await apiRequestsInfoModel.deleteMany()
    await sessionsModel.deleteMany()
    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})

})