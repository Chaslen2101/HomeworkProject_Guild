import {sessionsCollection} from "../../db/MongoDB";

export const sessionsQueryRep = {

    async getAllSessions(userId: string): Promise<any> {

        const allSessions = await sessionsCollection.find({userId: userId},{projection:{_id: 0}}).toArray();

        return allSessions.map(session => {
            return {
                deviceId: session.deviceId,
                ip: session.ip,
                lastActiveDate: session.lastActiveDate,
                title: session.title
            }
        })
    },

    async findSession(deviceId: string): Promise<any> {

        return await sessionsCollection.findOne({deviceId: deviceId}, {projection:{_id: 0}})
    }
}