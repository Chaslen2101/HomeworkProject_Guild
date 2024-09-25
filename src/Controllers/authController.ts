import {Request, Response} from "express"
import {userLoginService} from "../Services/authService";
import {httpStatuses} from "../settings";

export const loginController = async (req: Request, res: Response) => {
    const isLoggedIn = await userLoginService(req.body.password, req.body.loginOrEmail)
    if(isLoggedIn) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
    }
}