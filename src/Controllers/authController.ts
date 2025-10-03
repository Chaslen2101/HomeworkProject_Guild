import {Request, Response} from "express"
import {AuthService} from "../Services/authService";
import {httpStatuses} from "../settings";
import {UsersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {inject} from "inversify";
import {BlogsQueryRep} from "../Repository/queryRep/blogsQueryRep";


export class AuthController {

    constructor(
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep,
        @inject(AuthService) protected authService: AuthService
    ){}

    async login (req: Request, res: Response){

        const neededUser = await this.usersQueryRep.findUserByLoginOrEmail(req.body.loginOrEmail)
        if (!neededUser) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        }
        const token = await this.authService.login(req.body.password, neededUser, req.ip, req.headers["user-agent"])
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

    async getMyInfo (req: Request, res: Response){

        const userInfo = await this.usersQueryRep.findUserById(req.user.id)
        res
            .status(httpStatuses.OK_200)
            .json({
                email: userInfo!.email,
                login: userInfo!.login,
                userId: userInfo!.id
            })
    }

    async registration (req: Request, res: Response){

        const isEmailSent = await this.authService.registration(req.body)
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

    async confirmEmail (req: Request, res: Response){

        try {
            await this.authService.confirmEmail(req.body.code)
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

    async resendConfirmCode (req: Request, res: Response){

        const isEmailSent = await this.authService.resendConfirmCode(req.body.email)
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

    async refreshToken (req: Request, res: Response){

        const result = await this.authService.refreshToken(req.cookies.refreshToken, req.refreshTokenInfo)
        if (result) {
            res
                .status(httpStatuses.OK_200)
                .cookie("refreshToken", result.refreshToken, {httpOnly: true, secure: true})
                .json({accessToken: result.accessToken})
        } else {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
        }
    }

    async logout (req: Request, res: Response){

        const result = await this.authService.logout(req.cookies.refreshToken, req.refreshTokenInfo)
        if (result) {
            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})
        } else {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
        }
    }
}