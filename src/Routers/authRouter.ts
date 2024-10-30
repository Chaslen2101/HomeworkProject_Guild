import {Router} from "express";
import {
    confirmEmailController,
    getMyInfoController,
    loginController, logoutController, refreshTokenController,
    registrationController, resendConfirmCodeController
} from "../Controllers/authController";
import {loginValidator} from "../Features/validators/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {accessTokenCheck, refreshTokenCheck} from "../Features/globalFeatures/authorizationCheck";
import {createUserValidator, emailValidation} from "../Features/validators/userValidator";
import {RequestInfoCollector} from "../Features/globalFeatures/apiRequestInfo";

export const authRouter = Router()

authRouter.post("/login", RequestInfoCollector,loginValidator(), inputErrorCheckValidator, loginController)
authRouter.get("/me", accessTokenCheck, getMyInfoController)
authRouter.post("/registration", RequestInfoCollector, createUserValidator(),inputErrorCheckValidator, registrationController)
authRouter.post("/registration-confirmation", RequestInfoCollector,confirmEmailController)
authRouter.post("/registration-email-resending", RequestInfoCollector, emailValidation(), inputErrorCheckValidator,resendConfirmCodeController)
authRouter.post("/refresh-token", refreshTokenCheck, refreshTokenController)
authRouter.post("/logout", refreshTokenCheck, logoutController)
