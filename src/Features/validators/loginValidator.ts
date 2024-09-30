import {body} from "express-validator";

export const loginValidator = () => {
    return [
        body("loginOrEmail").trim().isLength({min:1}).withMessage("login field is empty")
            .isString().withMessage("login field should be string"),
        body("password").trim().isLength({min:1}).withMessage("password field is empty")
            .isString().withMessage("password field should be string")
    ]
}