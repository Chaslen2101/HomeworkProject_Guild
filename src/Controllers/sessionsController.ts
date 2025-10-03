import {Request, Response} from "express";
import {SessionsService} from "../Services/sessionsService";
import {httpStatuses} from "../settings";
import {SessionsQueryRep} from "../Repository/queryRep/sessionsQueryRep";
import {inject} from "inversify";


export class SessionsController {

    constructor(
        @inject(SessionsQueryRep) protected sessionsQueryRep: SessionsQueryRep,
        @inject(SessionsService) protected sessionsService: SessionsService
    ) {}

    async getActiveSessions (req: Request, res: Response){

        const result = await this.sessionsService.getAllSessions(req.refreshTokenInfo)

        res
            .status(httpStatuses.OK_200)
            .json(result)
    }

    async deleteAllSessions (req: Request, res: Response){

        await this.sessionsService.deleteAllSessions(req.refreshTokenInfo)

        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})
    }

    async deleteSession (req: Request, res: Response){

        const session = await this.sessionsQueryRep.findSession(req.params.deviceId)

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

            await this.sessionsService.deleteOneSession(session.userId, req.params.deviceId)

            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})

            return
        }
    }
}