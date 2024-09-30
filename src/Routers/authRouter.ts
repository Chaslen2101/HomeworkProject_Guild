import {Router} from "express";
import {getMyInfoController, loginController} from "../Controllers/authController";
import {loginValidator} from "../Features/validators/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {tokenAuthCheck} from "../Features/globalFeatures/authorizationCheck";

export const authRouter = Router()

authRouter.post("/login", loginValidator(), inputErrorCheckValidator, loginController)
authRouter.get("/me",tokenAuthCheck, getMyInfoController)