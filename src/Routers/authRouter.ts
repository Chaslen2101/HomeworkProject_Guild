import {Router} from "express";
import {inputErrorCheckValidator} from "../Infrastructure/Features/GlobalFeatures/inputCheckErrorValidator";
import {requestInfoCollector} from "../Infrastructure/Features/GlobalFeatures/apiRequestInfo";
import {authController, authorizationCheck, usersValidator} from "../composition-root";
import {isEmailValidator, loginValidator, newPasswordRecoveryValidator} from "../Infrastructure/Features/Validators/authValidator";

export const authRouter = Router()

authRouter.post("/login", requestInfoCollector, loginValidator(), inputErrorCheckValidator, authController.login.bind(authController))
authRouter.get("/me", authorizationCheck.accessTokenCheck, authController.getMyInfo.bind(authController))
authRouter.post("/registration", requestInfoCollector, usersValidator.validationOfCreateUser(),inputErrorCheckValidator, authController.registration.bind(authController))
authRouter.post("/registration-confirmation", requestInfoCollector,authController.confirmEmailForRegistration.bind(authController))
authRouter.post("/registration-email-resending", requestInfoCollector, usersValidator.emailValidation(), inputErrorCheckValidator,authController.resendConfirmCodeForRegistration.bind(authController))
authRouter.post("/refresh-token", authorizationCheck.refreshTokenCheck, authController.refreshToken.bind(authController))
authRouter.post("/logout", authorizationCheck.refreshTokenCheck, authController.logout.bind(authController))
authRouter.post("/password-recovery",requestInfoCollector,isEmailValidator(),inputErrorCheckValidator,authController.sendPasswordRecoveryCode.bind(authController))
authRouter.post("/new-password",requestInfoCollector,newPasswordRecoveryValidator(),inputErrorCheckValidator,authController.recoverPassword.bind(authController))
