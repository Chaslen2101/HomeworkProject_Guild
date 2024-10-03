import {Request, Response} from "express"
import {inputQueryType, inputUserType, userQueryType} from "../Types/Types";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";
import {queryHelper} from "../Features/globalFeatures/helper";
import {userService} from "../Services/userServices";


export const createUserController = async (req: Request<{},{},inputUserType>, res: Response) => {

        const newUserId = await userService.createUser(req.body)
        const newUser = await usersQueryRep.findUserById(newUserId)
        res
            .status(httpStatuses.CREATED_201)
            .json({newUser})
}

export const getUsersController = async (req: Request, res: Response) => {
    const sanitizedQuery: userQueryType = queryHelper.userQuery(req.query as inputQueryType)
    res
        .status(httpStatuses.OK_200)
        .json(await usersQueryRep.findMany(sanitizedQuery))
}

export const deleteUserController = async (req: Request, res: Response) => {

    const isDeleted = await userService.deleteUser(req.params.id)
    if (isDeleted) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.NOT_FOUND_404).json({})
    }
}