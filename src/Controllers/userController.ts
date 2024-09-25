import {createUserService, deleteUserService} from "../Services/userServices";
import {Request, Response} from "express"
import {inputQueryType, inputUserType} from "../Features/Types";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";

export const createUserController = async (req: Request<{},{},inputUserType>, res: Response) => {

        const newUserId = await createUserService(req.body)
        if (newUserId === "Login") {
            res
                .status(httpStatuses.BAD_REQUEST_400)
                .json({"errorsMessages":[{message: `login should be uniq`,field: `login`}]})
        } else if (newUserId === "Email") {
            res
                .status(httpStatuses.BAD_REQUEST_400)
                .json({"errorsMessages":[{message: `email should be uniq`,field: `email`}]})
        }else {
            res
                .status(httpStatuses.CREATED_201)
                .json(await usersQueryRep.findUserById(newUserId))
        }
}

export const getUsersController = async (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .json(await usersQueryRep.findMany(req.query as inputQueryType))
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