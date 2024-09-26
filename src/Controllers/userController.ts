import {createUserService, deleteUserService} from "../Services/userServices";
import {Request, Response} from "express"
import {inputQueryType, inputUserType} from "../Features/Types";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";
import {mapUserData} from "../Features/helper";

export const createUserController = async (req: Request<{},{},inputUserType>, res: Response) => {
    try {
        const newUserId = await createUserService(req.body)
        res
            .status(httpStatuses.CREATED_201)
            .json(await usersQueryRep.findUserById(newUserId))
    }catch (error) {
        res
            .status(httpStatuses.BAD_REQUEST_400)
            .json({"errorsMessages":[{message: `${error} should be uniq`,field: `${error}`}]})
    }
}

export const getUsersController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(mapUserData(usersQueryRep.findMany(req.query as inputQueryType)))
}

export const deleteUserController = async (req: Request, res: Response) => {

    const isDeleted = await deleteUserService(req.params.id)
    if (isDeleted) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404).json({})
    }
}