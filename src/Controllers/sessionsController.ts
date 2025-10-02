import {Request, Response} from "express";
import {sessionsService} from "../Services/sessionsService";
import {httpStatuses} from "../settings";
import {sessionsQueryRep} from "../Repository/queryRep/sessionsQueryRep";


class SessionsController {

    async getActiveSessions (req: Request, res: Response){

        const result = await sessionsService.getAllSessions(req.refreshTokenInfo)

        res
            .status(httpStatuses.OK_200)
            .json(result)
    }

    async deleteAllSessions (req: Request, res: Response){

        await sessionsService.deleteAllSessions(req.refreshTokenInfo)

        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }

    async deleteSession (req: Request, res: Response){

        const session = await sessionsQueryRep.findSession(req.params.deviceId)

        if (!session) {
            res
                .status(httpStatuses.NOT_FOUND_404)
                .json({})

            return

        } else if (session.userId !== req.refreshTokenInfo.id) {

            res
                .status(httpStatuses.FORBIDDEN_403)
                .json({})

            return

        } else {

            await sessionsService.deleteOneSession(session.userId, req.params.deviceId)

            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})

            return
        }
    }
}

export const sessionsController = new SessionsController()