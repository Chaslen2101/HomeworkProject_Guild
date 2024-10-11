import {refreshTokenCollection} from "../db/MongoDB";

export const tokenRepository = {

    async addNewTokenToBlackList (token: any) {
        await refreshTokenCollection.insertOne(token)
        return
    },

    async checkTokenInBlackList (token: any) {
        const result = await refreshTokenCollection.findOne(token)
        return !!result;
    }
}