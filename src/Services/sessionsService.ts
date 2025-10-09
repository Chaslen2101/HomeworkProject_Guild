import {SessionsQueryRep} from "../Repository/queryRep/sessionsQueryRep";
import {SessionsRepository} from "../Repository/sessionsRepository";
import {refreshTokenPayload} from "../Types/Types";
import {inject, injectable} from "inversify";


@injectable()
export class SessionsService {

    constructor(
        @inject(SessionsRepository) protected sessionsRepository: SessionsRepository,
        @inject(SessionsQueryRep) protected sessionsQueryRep: SessionsQueryRep
        ) {}

    async getAllSessions(refreshToken: refreshTokenPayload) {

        return await this.sessionsQueryRep.getAllSessions(refreshToken.id)
    }

    async deleteAllSessions(refreshToken: refreshTokenPayload) {

        await this.sessionsRepository.deleteAllDeviceSessions(refreshToken.id, refreshToken.deviceId)
        return
    }

    async deleteOneSession(userId: string, deviceId: string) {

        return await this.sessionsRepository.deleteOneDeviceSession(userId, deviceId)
    }
}

