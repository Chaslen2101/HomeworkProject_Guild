import {SessionsQueryRep} from "../../Infrastructure/QueryRep/sessionsQueryRep";
import {SessionsRepository} from "../../Infrastructure/Repository/sessionsRepository";
import {RefreshTokenPayload, SessionsInfoInstanceType} from "../../Types/Types";
import {inject, injectable} from "inversify";


@injectable()
export class SessionsService {

    constructor(
        @inject(SessionsRepository) protected sessionsRepository: SessionsRepository,
        @inject(SessionsQueryRep) protected sessionsQueryRep: SessionsQueryRep
        ) {}


    async deleteAllSessions(refreshToken: RefreshTokenPayload): Promise<boolean> {

        await this.sessionsRepository.deleteAllDeviceSessions(refreshToken.id, refreshToken.deviceId)
        return true
    }

    async deleteOneSession(deviceId: string, refreshTokenInfo: RefreshTokenPayload): Promise<boolean> {

        const neededSession: SessionsInfoInstanceType | null = await this.sessionsRepository.findByDeviceId(deviceId)
        if (!neededSession) {throw new Error("Cant find needed session") }
        if (neededSession.userId !== refreshTokenInfo.id) {throw new Error("Cant delete foreign session")}
        return await this.sessionsRepository.deleteOneDeviceSession(neededSession.userId, deviceId)
    }
}

