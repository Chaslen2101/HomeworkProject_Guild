import {NextFunction, Request, Response} from "express";
import {ADMIN_AUTH, httpStatuses} from "../../settings";
import {jwtService} from "../../Services/jwtService";
import {usersQueryRep} from "../../Repository/queryRep/usersQueryRep";
import {tokenRepository} from "../../Repository/tokenBlackListRepository";
import {sessionsQueryRep} from "../../Repository/queryRep/sessionsQueryRep";


export const fromBase64ToUTF8 = (code: string) => {
    const buff = Buffer.from(code, 'base64')
    return buff.toString('utf8')
}
export const fromUTF8ToBase64 = (code: string) => {
    const buff2 = Buffer.from(code, 'utf8')
    return buff2.toString('base64')
}

export const base64AuthorizationCheck = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    // console.log(auth)
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
    const codedAuth = fromUTF8ToBase64(ADMIN_AUTH)

    // if (decodedAuth !== SETTINGS.ADMIN) {
    if (auth.slice(6) !== codedAuth) {
        res
            .status(401)
            .json({})
        return
    }

    next()
}

export const accessTokenCheck = async (req: Request, res: Response, next: NextFunction) => {
    const isTokenValid = req.headers.authorization ? await jwtService.verifyAccessToken(req.headers.authorization.split(" ")[1]) : null
    if (!isTokenValid) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }
    const neededUser = await usersQueryRep.findUserById(isTokenValid.id)
    if (!neededUser) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }else {
        req.user = neededUser
        next()
    }
}

export const refreshTokenCheck = async (req: Request, res: Response, next: NextFunction) => {

    const isTokenValid = req.cookies.refreshToken ? await jwtService.verifyRefreshToken(req.cookies.refreshToken) : null
    if(!isTokenValid) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }

    const result = await tokenRepository.checkTokenInBlackList(req.cookies.refreshToken)
    if (result) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }

    const result1 = await sessionsQueryRep.findSession(isTokenValid.deviceId)
    if (!result1) {
        res
            .status(httpStatuses.UNAUTHORIZED_401)
            .json({})
        return
    }

    req.refreshTokenInfo = isTokenValid

    next()
}
