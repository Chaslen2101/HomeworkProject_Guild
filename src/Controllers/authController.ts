import {Request, Response} from "express"
import {authService} from "../Services/authService";
import {httpStatuses} from "../settings";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";



export const loginController = async (req: Request, res: Response) => {

    const neededUser = await usersQueryRep.findUserByLoginOrEmail(req.body.loginOrEmail)
    if (!neededUser) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }
    const token = await authService.login(req.body.password, neededUser)
    if (!token) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
    } else {
        res
            .status(httpStatuses.OK_200)
            .json({accessToken: token})
    }
}

export const getMyInfoController = async (req: Request, res: Response) => {
    const userInfo = await usersQueryRep.findUserById(req.user.id)
    res
        .status(httpStatuses.OK_200)
        .json({
            email: userInfo!.email,
            login: userInfo!.login,
            userId: userInfo!.id
        })
}
