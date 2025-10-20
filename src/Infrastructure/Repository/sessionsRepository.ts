import {SessionsModel} from "../../db/MongoDB";
import {injectable} from "inversify";
import {SessionsInfoInstanceType} from "../../Types/Types";


@injectable()
export class SessionsRepository {
    
    async save(session: SessionsInfoInstanceType): Promise<SessionsInfoInstanceType> {
        return await session.save()
    }

    async findByDeviceId (id: string): Promise<SessionsInfoInstanceType | null> {

        return await SessionsModel.findOne({deviceId: id}, {projection: {_id: 0}})
    }

    async updateDeviceSession(deviceId: string, userId: string): Promise<void> {
        await SessionsModel.updateOne( {$and: [{deviceId: deviceId},{userId: userId}]}, {$set: {lastActiveDate: new Date().toISOString()}})
        return
    }

    async deleteOneDeviceSession(userId: string, deviceId: string,): Promise<boolean> {

         const result = await SessionsModel.deleteOne({$and: [{deviceId: deviceId},{userId: userId}]})
        return result.deletedCount === 1
    }

    async deleteAllDeviceSessions(userId: string, deviceId: string): Promise<boolean> {

        const result = await SessionsModel.deleteMany({$and: [{deviceId: {$not: {$eq: deviceId}}}, {userId: userId}]})
        return result.deletedCount > 1
    }
}



