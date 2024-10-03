import {Router} from "express";
import {
    confirmEmailController,
    getMyInfoController,
    loginController,
    registrationController, resendConfirmCodeController
} from "../Controllers/authController";
import {loginValidator} from "../Features/validators/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {tokenAuthCheck} from "../Features/globalFeatures/authorizationCheck";
import {createUserValidator, emailValidation} from "../Features/validators/userValidator";

export const authRouter = Router()

authRouter.post("/login", loginValidator(), inputErrorCheckValidator, loginController)
authRouter.get("/me",tokenAuthCheck, getMyInfoController)
authRouter.post("/registration", createUserValidator(),inputErrorCheckValidator, registrationController)
authRouter.post("/registration-confirmation", confirmEmailController)
authRouter.post("/registration-email-resending", emailValidation(), inputErrorCheckValidator,resendConfirmCodeController)