import {httpStatuses} from "../settings";
import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";


export const inputErrorCheckValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}) as { path: string, msg: string }[]
        res
            .status(httpStatuses.BAD_REQUEST_400)
            .json({
                errorsMessages: errorsArray.map(x => ({field: x.path, message: x.msg}))
            })
        return
    }
    next()
}