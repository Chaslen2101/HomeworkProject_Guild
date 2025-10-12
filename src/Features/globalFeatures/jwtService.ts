import {AccessTokenPayload, RefreshTokenPayload} from "../../Types/Types";
import jwt from "jsonwebtoken";
import {SETTINGS} from "../../settings";
import {randomUUID, UUID} from "node:crypto";


export const jwtService = {

    async createAccessToken(user: AccessTokenPayload): Promise<string> {
        return jwt.sign({id: user.id, login: user.login}, SETTINGS.SECRET_ACCESS_TOKEN_KEY, {expiresIn: "10s"})
    },

    async verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
        try {
            return jwt.verify(token, SETTINGS.SECRET_ACCESS_TOKEN_KEY) as { id: string, login: string }
        } catch (e) {
            console.log("token error:" + e)
            return null
        }
    },

    async createRefreshToken(user: RefreshTokenPayload, someDeviceId?: string): Promise<string> {

        const deviceId = someDeviceId ? someDeviceId : user.deviceId
        return jwt.sign({deviceId: deviceId, id: user.id, login: user.login, UUID: randomUUID()}, SETTINGS.SECRET_REFRESH_TOKEN_KEY, {expiresIn: "20s"})
    },

    async verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
        try {
            return jwt.verify(token, SETTINGS.SECRET_REFRESH_TOKEN_KEY) as {deviceId: UUID, id: string, login: string}
        } catch (e) {
            console.log("token error:" + e)
            return null
        }
    }
}