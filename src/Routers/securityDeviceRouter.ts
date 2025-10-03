import {Router} from "express";
import {authorizationCheck, sessionsController} from "../composition-root";

export const securityDeviceRouter = Router()

securityDeviceRouter.get("/", authorizationCheck.refreshTokenCheck, sessionsController.getActiveSessions.bind(sessionsController));
securityDeviceRouter.delete("/", authorizationCheck.refreshTokenCheck,sessionsController.deleteAllSessions.bind(sessionsController));
securityDeviceRouter.delete("/:deviceId", authorizationCheck.refreshTokenCheck, sessionsController.deleteSession.bind(sessionsController));