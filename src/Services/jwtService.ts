import {existUserType, userInfoForTokenType} from "../Types/Types";
import jwt from "jsonwebtoken";
import {SETTINGS} from "../settings";

export const jwtService = {

    async createAccessToken(user: userInfoForTokenType) {
        return jwt.sign({id: user.id, login: user.login}, SETTINGS.SECRET_ACCESS_TOKEN_KEY, {expiresIn: "10s"})
    },

    async verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, SETTINGS.SECRET_ACCESS_TOKEN_KEY) as { id: string, login: string }
        } catch (e) {
            console.log("token error:" + e)
            return null
        }
    },

    async createRefreshToken(user: userInfoForTokenType) {
        return jwt.sign({id: user.id, login: user.login}, SETTINGS.SECRET_REFRESH_TOKEN_KEY, {expiresIn: "20s"})
    },

    async verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, SETTINGS.SECRET_REFRESH_TOKEN_KEY) as { id: string, login: string }
        } catch (e) {
            console.log("token error:" + e)
            return null
        }
    },
}