import {Router} from "express";
import {createUserValidator} from "../Features/userValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {createUserController, deleteUserController, getUsersController} from "../Controllers/userController";
import {authorizationCheck} from "../Features/globalFeatures/authorizationCheck";

export const usersRouter = Router()

usersRouter.post("/",authorizationCheck, createUserValidator(), inputErrorCheckValidator, createUserController)
usersRouter.get("/",authorizationCheck,getUsersController)
usersRouter.delete("/:id", authorizationCheck,deleteUserController)