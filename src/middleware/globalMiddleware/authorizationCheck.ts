import {NextFunction, Request, Response} from "express";
import {ADMIN_AUTH} from "../../settings";


export const fromBase64ToUTF8 = (code: string) => {
    const buff = Buffer.from(code, 'base64')
    return buff.toString('utf8')
}
export const fromUTF8ToBase64 = (code: string) => {
    const buff2 = Buffer.from(code, 'utf8')
    return buff2.toString('base64')
}

export const authorizationCheck = (req: Request, res: Response, next: NextFunction) => {
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