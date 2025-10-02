import {sessionsQueryRep} from "../Repository/queryRep/sessionsQueryRep";
import {sessionsRepository} from "../Repository/sessionsRepository";
import {refreshTokenInfoType} from "../Types/Types";


class SessionsService {

    async getAllSessions(refreshToken: refreshTokenInfoType) {

        return await sessionsQueryRep.getAllSessions(refreshToken.id)
    }

    async deleteAllSessions(refreshToken: refreshTokenInfoType) {

        await sessionsRepository.deleteAllDeviceSessions(refreshToken.id, refreshToken.deviceId)
        return
    }

    async deleteOneSession(userId: string, deviceId: string) {

        return await sessionsRepository.deleteOneDeviceSession(userId, deviceId)
    }
}

export const sessionsService = new SessionsService()