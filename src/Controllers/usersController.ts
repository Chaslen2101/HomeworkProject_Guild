import {Request, Response} from "express"
import {InputQueryType, InputUserType, UserQueryType} from "../Types/Types";
import {UsersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {httpStatuses} from "../settings";
import {queryHelper} from "../Features/globalFeatures/helper";
import {UsersService} from "../Services/usersServices";
import {inject} from "inversify";


export class UsersController {

    constructor(
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep,
        @inject(UsersService) protected usersService: UsersService
    ) {}

    async createUser (req: Request<{}, {}, InputUserType>, res: Response)  {

        const newUserId = await this.usersService.createUser(req.body)
        const newUser = await this.usersQueryRep.findUserById(newUserId)
        res
            .status(httpStatuses.CREATED_201)
            .json(newUser)
    }

    async getManyUsers (req: Request, res: Response) {

        const sanitizedQuery: UserQueryType = queryHelper.userQuery(req.query as InputQueryType)
        res
            .status(httpStatuses.OK_200)
            .json(await this.usersQueryRep.findManyUsersByLoginOrEmail(sanitizedQuery))
    }

    async deleteUser (req: Request, res: Response) {

        const isDeleted = await this.usersService.deleteUser(req.params.id)
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

