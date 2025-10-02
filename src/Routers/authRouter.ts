import {Router} from "express";
import {authController} from "../Controllers/authController";
import {loginValidator} from "../Features/validators/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {accessTokenCheck, refreshTokenCheck} from "../Features/globalFeatures/authorizationCheck";
import {usersValidator} from "../Features/validators/usersValidator";
import {RequestInfoCollector} from "../Features/globalFeatures/apiRequestInfo";

export const authRouter = Router()

authRouter.post("/login", RequestInfoCollector, loginValidator(), inputErrorCheckValidator, authController.login)
authRouter.get("/me", accessTokenCheck, authController.getMyInfo)
authRouter.post("/registration", RequestInfoCollector, usersValidator.validationOfCreateUser(),inputErrorCheckValidator, authController.registration)
authRouter.post("/registration-confirmation", RequestInfoCollector,authController.confirmEmail)
authRouter.post("/registration-email-resending", RequestInfoCollector, usersValidator.emailValidation(), inputErrorCheckValidator,authController.resendConfirmCode)
authRouter.post("/refresh-token", refreshTokenCheck, authController.refreshToken)
authRouter.post("/logout", refreshTokenCheck, authController.logout)
