import {sessionsModel} from "../../db/MongoDB";
import {injectable} from "inversify";
import {SessionInfoClass, SessionInfoViewType} from "../../Types/Types";


@injectable()
export class SessionsQueryRep {

    async getAllSessions(userId: string): Promise<SessionInfoViewType[]> {

        const allSessions = await sessionsModel.find({userId: userId},{projection:{_id: 0}}).lean();

        return allSessions.map(session => {
            return {
                ip: session.ip,
                title: session.title,
                lastActiveDate: session.lastActiveDate,
                deviceId: session.deviceId,
            }
        })
    }

    async findSession(deviceId: string): Promise<SessionInfoClass | null> {

        return await sessionsModel.findOne({deviceId: deviceId}, {projection:{_id: 0}})
    }
}

