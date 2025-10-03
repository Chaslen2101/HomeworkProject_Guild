import {Router} from "express";
import {inputErrorCheckValidator} from "../Features/globalFeatures/inputCheckErrorValidator";
import {authorizationCheck, usersController, usersValidator} from "../composition-root";

export const usersRouter = Router()

usersRouter.post("/",authorizationCheck.base64AuthorizationCheck, usersValidator.validationOfCreateUser(), inputErrorCheckValidator, usersController.createUser.bind(usersController));
usersRouter.get("/",authorizationCheck.base64AuthorizationCheck,usersController.getManyUsers.bind(usersController));
usersRouter.delete("/:id", authorizationCheck.base64AuthorizationCheck,usersController.deleteUser.bind(usersController));