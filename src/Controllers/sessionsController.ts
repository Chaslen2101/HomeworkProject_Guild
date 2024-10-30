import {Request, Response} from "express";
import {sessionService} from "../Services/sessionService";
import {httpStatuses} from "../settings";
import {sessionsQueryRep} from "../Repository/queryRep/sessionsQueryRep";

export const getActiveSessionsController = async (req: Request, res: Response) => {

    const result = await sessionService.getAllSessions(req.refreshTokenInfo)

    res
        .status(httpStatuses.OK_200)
        .json(result)

}

export const deleteAllSessionsController = async (req: Request, res: Response) => {

    await sessionService.deleteAllSessions(req.refreshTokenInfo)

    res
        .status(httpStatuses.NO_CONTENT_204)
        .json({})

}

export const deleteSessionController = async (req: Request, res: Response) => {

    const session = await sessionsQueryRep.findSession(req.params.deviceId)

    if(!session) {
        res
            .status(httpStatuses.NOT_FOUND_404)
            .json({})

        return

    }else if (session.userId !== req.refreshTokenInfo.id) {

        res
            .status(httpStatuses.FORBIDDEN_403)
            .json({})

        return

    }else {

        await sessionService.deleteOneSession(session.userId, req.params.deviceId)

        res
            .status(httpStatuses.NO_CONTENT_204)
            .json({})

        return

    }

}