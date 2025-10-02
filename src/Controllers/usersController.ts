import {Request, Response} from "express"
import {inputQueryType, inputUserType, userQueryType} from "../Types/Types";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";
import {queryHelper} from "../Features/globalFeatures/helper";
import {usersService} from "../Services/usersServices";


class UserController {

    async createUser (req: Request<{}, {}, inputUserType>, res: Response)  {

        const newUserId = await usersService.createUser(req.body)
        const newUser = await usersQueryRep.findUserById(newUserId)
        res
            .status(httpStatuses.CREATED_201)
            .json(newUser)
    }

    async getManyUsers (req: Request, res: Response) {

        const sanitizedQuery: userQueryType = queryHelper.userQuery(req.query as inputQueryType)
        res
            .status(httpStatuses.OK_200)
            .json(await usersQueryRep.findManyUsersByLoginOrEmail(sanitizedQuery))
    }

    async deleteUser (req: Request, res: Response) {

        const isDeleted = await usersService.deleteUser(req.params.id)
        if (isDeleted) {
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        } else {
            res
                .status(httpStatuses.NOT_FOUND_404).json({})
        }
    }
}

export const usersController = new UserController()