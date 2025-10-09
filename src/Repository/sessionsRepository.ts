import {sessionsModel} from "../db/MongoDB";
import {injectable} from "inversify";
import {UUID} from "node:crypto";
import {SessionInfoClass} from "../Types/Types";


@injectable()
export class SessionsRepository {

    async addNewDeviceSession(deviceId: string, userId: string, ip: string | undefined, deviceName: string | undefined): Promise<void> {

        const newSession = new SessionInfoClass(
            ip,
            deviceName,
            new Date(),
            deviceId,
            userId
        )
        await sessionsModel.insertOne(newSession);
        return
    }

    async updateDeviceSession(deviceId: string, userId: string): Promise<void> {
        await sessionsModel.updateOne( {$and: [{deviceId: deviceId},{userId: userId}]}, {$set: {lastActiveDate: new Date().toISOString()}})
        return
    }

    async deleteOneDeviceSession(userId: string, deviceId: string,): Promise<void> {

        await sessionsModel.deleteOne({$and: [{deviceId: deviceId},{userId: userId}]})
        return
    }

    async deleteAllDeviceSessions(userId: string, deviceId: string): Promise<void> {

        await sessionsModel.deleteMany({$and: [{deviceId: {$not: {$eq: deviceId}}}, {userId: userId}]})
        return
    }
}



