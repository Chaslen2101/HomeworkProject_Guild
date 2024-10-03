import {existUserType} from "../Types/Types";
import jwt from "jsonwebtoken";
import {SETTINGS} from "../settings";

export const jwtService = {

    async createToken(user: existUserType) {
        return jwt.sign({id: user.id, login: user.login}, SETTINGS.SECRET_KEY,{expiresIn: "5d"})
    },

    async verifyToken (token: string) {
        try {
            return jwt.verify(token, SETTINGS.SECRET_KEY) as {id: string, login: string}
        } catch (e) {
            console.log("token error:" + e)
            return null
        }
    }
}