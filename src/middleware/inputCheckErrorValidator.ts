import {httpStatuses} from "../settings";
import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";


export const inputErrorCheckValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array() as { path: string, msg: string }[]
        const filteredArray:{path: string, msg: string}[] = []
        for (let errorObject of errorsArray) {
            if (filteredArray.find(error => error.path === errorObject.path)) {
            }else {
                filteredArray.push(errorObject)
            }
        }
        res
            .status(httpStatuses.BAD_REQUEST_400)
            .json({
                errorsMessages: filteredArray.map(x => ({message: x.msg, field: x.path}))
            })
    }
    next()
}