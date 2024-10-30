import {sessionsCollection} from "../../db/MongoDB";

export const sessionsQueryRep = {

    async getAllSessions(userId: string): Promise<any> {

        const allSessions = await sessionsCollection.find({userId: userId},{projection:{_id: 0}}).toArray();

        return allSessions.map(session => {
            return {
                ip: session.ip,
                title: session.deviceName,
                lastActiveDate: session.lastActiveDate,
                deviceId: session.deviceId
            }
        })
    },

    async findSession(deviceId: string): Promise<any> {

        return await sessionsCollection.findOne({deviceId: deviceId}, {projection:{_id: 0}})
    }
}