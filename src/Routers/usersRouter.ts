import {Router} from "express";
import {createUserValidator} from "../Features/validators/userValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {createUserController, deleteUserController, getUsersController} from "../Controllers/userController";
import {base64AuthorizationCheck} from "../Features/globalFeatures/authorizationCheck";

export const usersRouter = Router()

usersRouter.post("/",base64AuthorizationCheck, createUserValidator(), inputErrorCheckValidator, createUserController)
usersRouter.get("/",base64AuthorizationCheck,getUsersController)
usersRouter.delete("/:id", base64AuthorizationCheck,deleteUserController)