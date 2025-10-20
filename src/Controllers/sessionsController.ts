import {Request, Response} from "express";
import {SessionsService} from "../Application/Services/sessionsService";
import {httpStatuses} from "../settings";
import {SessionsQueryRep} from "../Infrastructure/QueryRep/sessionsQueryRep";
import {inject} from "inversify";
import {SessionsInfoViewType} from "../Types/Types";


export class SessionsController {

    constructor(
        @inject(SessionsQueryRep) protected sessionsQueryRep: SessionsQueryRep,
        @inject(SessionsService) protected sessionsService: SessionsService
    ) {}

    async getActiveSessions (req: Request, res: Response){

        const result: SessionsInfoViewType[] = await this.sessionsQueryRep.getAllSessions(req.refreshTokenInfo)

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

        try {

            await this.sessionsService.deleteOneSession(req.params.deviceId,req.refreshTokenInfo.id)

            res
                .status(httpStatuses.NO_CONTENT_204)
                .json({})

        } catch(e) {


            if (e instanceof Error) {
                if (e.message === "Cant find needed session") {
                    res
                        .status(httpStatuses.NOT_FOUND_404)
                        .json({})
                }

                if (e.message === "Cant delete foreign session") {
                    res
                        .status(httpStatuses.FORBIDDEN_403)
                        .json({})
                }
            }

        }
    }
}