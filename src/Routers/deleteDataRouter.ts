import {Router} from "express"
import {Request, Response} from "express";
import {httpStatuses} from "../settings";
import {
    apiRequestsInfoModel,
    BlogsModel,
    CommentsModel,
    PostsModel,
    refreshTokenModel, SessionsModel,
    UsersModel
} from "../db/MongoDB";

export const deleteAllRouter = Router({})

deleteAllRouter.delete("/",async (req: Request, res: Response) => {
    await BlogsModel.deleteMany()
    await PostsModel.deleteMany()
    await UsersModel.deleteMany()
    await CommentsModel.deleteMany()
    await refreshTokenModel.deleteMany()
    await apiRequestsInfoModel.deleteMany()
    await SessionsModel.deleteMany()
    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})

})