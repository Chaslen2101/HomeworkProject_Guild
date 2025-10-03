import {Router} from "express";
import {loginValidator} from "../Features/validators/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {RequestInfoCollector} from "../Features/globalFeatures/apiRequestInfo";
import {authController, authorizationCheck, usersValidator} from "../composition-root";

export const authRouter = Router()

authRouter.post("/login", RequestInfoCollector, loginValidator(), inputErrorCheckValidator, authController.login.bind(authController))
authRouter.get("/me", authorizationCheck.accessTokenCheck, authController.getMyInfo.bind(authController))
authRouter.post("/registration", RequestInfoCollector, usersValidator.validationOfCreateUser(),inputErrorCheckValidator, authController.registration.bind(authController))
authRouter.post("/registration-confirmation", RequestInfoCollector,authController.confirmEmail.bind(authController))
authRouter.post("/registration-email-resending", RequestInfoCollector, usersValidator.emailValidation(), inputErrorCheckValidator,authController.resendConfirmCode.bind(authController))
authRouter.post("/refresh-token", authorizationCheck.refreshTokenCheck, authController.refreshToken.bind(authController))
authRouter.post("/logout", authorizationCheck.refreshTokenCheck, authController.logout.bind(authController))
