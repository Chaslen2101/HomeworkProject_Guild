import {sessionsCollection} from "../db/MongoDB";

export const sessionsRepository = {

    async addNewDeviceSession(deviceId: string, userId: string, ip: string | undefined, deviceName: string | undefined): Promise<void> {
        await sessionsCollection.insertOne({
            ip: ip,
            title: deviceName,
            lastActiveDate: new Date().toISOString(),
            deviceId: deviceId,
            userId: userId
        });
        return
    },

    async updateDeviceSession(deviceId: string, userId: string): Promise<void> {
        await sessionsCollection.updateOne( {$and: [{deviceId: deviceId},{userId: userId}]}, {$set: {lastActiveDate: new Date().toISOString()}})
        return
    },

    async deleteOneDeviceSession(userId: string, deviceId: string,): Promise<void> {

        await sessionsCollection.deleteOne({$and: [{deviceId: deviceId},{userId: userId}]})
        return
    },

    async deleteAllDeviceSessions(userId: string, deviceId: string): Promise<void> {

        await sessionsCollection.deleteMany({$and: [{deviceId: {$not: {$eq: deviceId}}}, {userId: userId}]})
        return
    }
}