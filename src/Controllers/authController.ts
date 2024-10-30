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
    const token = await authService.login(req.body.password, neededUser, req.ip, req.headers["user-agent"])
    if (!token) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
    } else {
        res
            .status(httpStatuses.OK_200)
            .cookie("refreshToken", token.refreshToken, {httpOnly: true, secure: true})
            .json({accessToken: token.accessToken})
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

export const registrationController = async (req: Request, res: Response) => {
    const isEmailSent = await authService.registration(req.body)
    if (isEmailSent) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    } else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const confirmEmailController = async (req: Request, res: Response) => {
    try {
        await authService.confirmEmail(req.body.code)
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    } catch (e) {
        res
            .status(httpStatuses.BAD_REQUEST_400)
            .json({
                errorsMessages: [
                    {
                        message: (e as Error).message,
                        field: "code"
                    }
                ]
            })
    }
}

export const resendConfirmCodeController = async (req: Request, res: Response) => {
    const isEmailSent = await authService.resendConfirmCode(req.body.email)
    if (isEmailSent) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    } else {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})
    }
}

export const refreshTokenController = async (req: Request, res: Response) => {

    const result = await authService.refreshToken(req.cookies.refreshToken, req.refreshTokenInfo)
    if(result) {
        res
            .status(httpStatuses.OK_200)
            .cookie("refreshToken", result.refreshToken,{httpOnly: true, secure: true})
            .json({accessToken: result.accessToken})
    }else {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
    }
}

export const logoutController = async (req: Request, res: Response) => {
    const result = await authService.logout(req.cookies.refreshToken, req.refreshTokenInfo)
    if(result) {
        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }else {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
    }
}
