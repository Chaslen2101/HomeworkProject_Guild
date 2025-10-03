import {body} from "express-validator";

export const isEmailValidator = () => {
    return [
        body("email").trim().isEmail().withMessage("Invalid email address")
    ]
}

export const loginValidator = () => {
    return [
        body("loginOrEmail").trim().isLength({min:1}).withMessage("login field is empty")
            .isString().withMessage("login field should be string"),
        body("password").trim().isLength({min:1}).withMessage("password field is empty")
            .isString().withMessage("password field should be string")
    ]
}

export const newPasswordRecoveryValidator = () => {
    return [
        body("newPassword").trim().isString().withMessage("newPassword should be string").isLength({min:6,max:20}).withMessage("newPassword should be from 6 to 20 symbols"),
        body("recoveryCode").trim().isString().withMessage("recovery code should be string")
    ]
}