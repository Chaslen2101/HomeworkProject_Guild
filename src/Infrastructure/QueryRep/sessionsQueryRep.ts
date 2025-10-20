import {SessionsModel} from "../../db/MongoDB";
import {injectable} from "inversify";
import {SessionsInfoDBType, SessionsInfoViewType} from "../../Types/Types";
import {mapToView} from "../Features/GlobalFeatures/helper";


@injectable()
export class SessionsQueryRep {

    async getAllSessions(userId: string): Promise<SessionsInfoViewType[]> {

        const notMappedSessions: SessionsInfoDBType[] = await SessionsModel.find({userId: userId},{projection:{_id: 0}}).lean();

        return mapToView.mapSessionsInfo(notMappedSessions);
    }

    async findSession(deviceId: string): Promise<SessionsInfoViewType | null> {

        const notMappedSession: SessionsInfoDBType | null = await SessionsModel.findOne({deviceId: deviceId}, {projection:{_id: 0}}).lean()
        if(!notMappedSession) {return null}
        return mapToView.mapSessionInfo(notMappedSession)
    }
}

