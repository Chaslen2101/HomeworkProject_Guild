import {Router} from "express";
import {
    deleteAllSessionsController,
    deleteSessionController,
    getActiveSessionsController
} from "../Controllers/sessionsController";
import {refreshTokenCheck} from "../Features/globalFeatures/authorizationCheck";

export const securityDeviceRouter = Router()

securityDeviceRouter.get("/", refreshTokenCheck, getActiveSessionsController)
securityDeviceRouter.delete("/", refreshTokenCheck,deleteAllSessionsController)
securityDeviceRouter.delete("/:deviceId", refreshTokenCheck, deleteSessionController)