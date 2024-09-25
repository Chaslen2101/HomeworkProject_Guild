import {body} from "express-validator";

import {usersQueryRep} from "../Repository/queryRep/userQueryRep";

export const createUserValidator = () => {
    return [
        body("login").trim().isLength({min:3, max:10}).withMessage("login length should be in 3 to 10")
            .isString().withMessage("login should be string")
            .matches(/^[a-zA-Z0-9_-]*$/).withMessage("login doesnt match pattern")
            .custom(async newUserLogin => {
                const isUserExist  = await usersQueryRep.findUserByLoginOrEmail(newUserLogin)
                if (isUserExist) throw new Error ("login already in use")
            }),
        body("password").trim().isLength({min:6, max:20}).withMessage("password should be from 6 to 20 symbols")
            .isString().withMessage("password should be string"),
        body("email").trim().isString().withMessage("email should be string")
            .isEmail().withMessage("use real Email address")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("email doesnt match pattern")
            .custom(async userEmail => {
                const isUserExist = await usersQueryRep.findUserByLoginOrEmail(userEmail)
                if (isUserExist) throw new Error ("email already in use")
            })
    ]
}