import {Router} from "express";
import {usersValidator} from "../Features/validators/usersValidator";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {usersController} from "../Controllers/usersController";
import {base64AuthorizationCheck} from "../Features/globalFeatures/authorizationCheck";

export const usersRouter = Router()

usersRouter.post("/",base64AuthorizationCheck, usersValidator.validationOfCreateUser(), inputErrorCheckValidator, usersController.createUser)
usersRouter.get("/",base64AuthorizationCheck,usersController.getManyUsers)
usersRouter.delete("/:id", base64AuthorizationCheck,usersController.deleteUser)