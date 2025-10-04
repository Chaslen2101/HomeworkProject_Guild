import {NextFunction, Request, Response} from "express";
import {ADMIN_AUTH, httpStatuses} from "../../settings";
import {jwtService} from "./jwtService";
import {UsersQueryRep} from "../../Repository/queryRep/usersQueryRep";
import {TokenBlackListRepository} from "../../Repository/tokenBlackListRepository";
import {SessionsQueryRep} from "../../Repository/queryRep/sessionsQueryRep";
import {inject} from "inversify";


export class AuthorizationCheck {

    constructor(
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep,
        @inject(TokenBlackListRepository) protected tokenBlackListRepository: TokenBlackListRepository,
        @inject(SessionsQueryRep) protected sessionsQueryRep: SessionsQueryRep,
    ) {}

    fromBase64ToUTF8 = (code: string) => {
        const buff = Buffer.from(code, 'base64')
        return buff.toString('utf8')
    }

    fromUTF8ToBase64 = (code: string) => {
        const buff2 = Buffer.from(code, 'utf8')
        return buff2.toString('base64')
    }

    base64AuthorizationCheck = (req: Request, res: Response, next: NextFunction) => {
        const auth = req.headers['authorization'] as string // 'Basic xxxx'

        if (!auth) {
            res
                .status(401)
                .json({})
            return
        }
        if (auth.slice(0, 6) !== 'Basic ') {
            res
                .status(401)
                .json({})
            return
        }

        // const decodedAuth = fromBase64ToUTF8(auth.slice(6))
        const codedAuth = this.fromUTF8ToBase64(ADMIN_AUTH)

        // if (decodedAuth !== SETTINGS.ADMIN) {
        if (auth.slice(6) !== codedAuth) {
            res
                .status(401)
                .json({})
            return
        }

        next()
    }

    accessTokenCheck = async (req: Request, res: Response, next: NextFunction) => {

        const isTokenValid = req.headers.authorization ? await jwtService.verifyAccessToken(req.headers.authorization.split(" ")[1]) : null

        if (!isTokenValid) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        }

        const neededUser = await this.usersQueryRep.findUserById(isTokenValid.id)

        if (!neededUser) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        } else {
            req.user = neededUser
            next()
        }
    }

    refreshTokenCheck = async (req: Request, res: Response, next: NextFunction) => {

        const isTokenValid = req.cookies.refreshToken ? await jwtService.verifyRefreshToken(req.cookies.refreshToken) : null
        if (!isTokenValid) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        }

        const result = await this.tokenBlackListRepository.checkTokenInBlackList(req.cookies.refreshToken)
        if (result) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        }

        const result1 = await this.sessionsQueryRep.findSession(isTokenValid.deviceId)
        if (!result1) {
            res
                .status(httpStatuses.UNAUTHORIZED_401)
                .json({})
            return
        }

        req.refreshTokenInfo = isTokenValid

        next()
    }
}