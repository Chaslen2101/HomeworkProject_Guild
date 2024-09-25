import {createUserService, deleteUserService} from "../Services/userServices";
import {Request, Response} from "express"
import {inputQueryType, inputUserType} from "../Features/Types";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";

export const createUserController = async (req: Request<{},{},inputUserType>, res: Response) => {
    const newUserId = await createUserService(req.body)
    res
        .status(httpStatuses.CREATED_201)
        .json(await usersQueryRep.findUserById(newUserId))
}

export const getUsersController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await usersQueryRep.findMany(req.query as inputQueryType))
}

export const deleteUserController = async (req: Request, res: Response) => {

    if (!await usersQueryRep.findUserById(req.params.id)) res.status(httpStatuses.NOT_FOUND_404).json({})
    await deleteUserService(req.params.id)
    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})
}