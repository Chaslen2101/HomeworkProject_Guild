import {body} from "express-validator";
import {UsersQueryRep} from "../../Repository/queryRep/usersQueryRep";
import {inject} from "inversify";


export class UsersValidator {

    constructor(
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep
    ) {}

    validationOfCreateUser = () => {
        return [
            body("login").trim().isLength({min: 3, max: 10}).withMessage("login length should be in 3 to 10")
                .isString().withMessage("login should be string")
                .matches(/^[a-zA-Z0-9_-]*$/).withMessage("login doesnt match pattern")
                .custom(async login => {
                    if (await this.usersQueryRep.findUserByLoginOrEmail(login)) {
                        throw new Error("login and email should be uniq")
                    }
                }),
            body("password").trim().isLength({min: 6, max: 20}).withMessage("password should be from 6 to 20 symbols")
                .isString().withMessage("password should be string"),
            body("email").trim().isString().withMessage("email should be string")
                .isEmail().withMessage("use real Email address")
                .matches(/^[\w+-.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("email doesnt match pattern")
                .custom(async email => {
                    if (await this.usersQueryRep.findUserByLoginOrEmail(email)) {
                        throw new Error("login or email should be uniq")
                    }
                })
        ]
    }

    emailValidation = () => {
        return [
            body("email").trim().isEmail().withMessage("Input real Email")
                .isString().withMessage("email should be string")
                .matches(/^[\w+-.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Email should match the pattern")
                .custom(async email => {
                    const user = await this.usersQueryRep.findUserByLoginOrEmail(email)
                    if (!user) throw new Error("user with this email doesnt exists")
                    if (user.emailConfirmationInfo.isConfirmed === true) throw new Error("Email already confirmed")
                })
        ]
    }
}