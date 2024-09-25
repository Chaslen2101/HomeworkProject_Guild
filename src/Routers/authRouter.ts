import {Router} from "express";
import {loginController} from "../Controllers/authController";
import {loginValidator} from "../Features/loginValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";

export const authRouter = Router()

authRouter.post("/login", loginValidator(), inputErrorCheckValidator, loginController)