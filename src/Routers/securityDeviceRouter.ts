import {Router} from "express";
import {sessionsController} from "../Controllers/sessionsController";
import {refreshTokenCheck} from "../Features/globalFeatures/authorizationCheck";

export const securityDeviceRouter = Router()

securityDeviceRouter.get("/", refreshTokenCheck, sessionsController.getActiveSessions)
securityDeviceRouter.delete("/", refreshTokenCheck,sessionsController.deleteAllSessions)
securityDeviceRouter.delete("/:deviceId", refreshTokenCheck, sessionsController.deleteSession)