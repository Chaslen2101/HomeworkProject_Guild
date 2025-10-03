import {refreshTokenCollection} from "../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class TokenBlackListRepository {

    async addNewTokenToBlackList (token: any) {
        await refreshTokenCollection.insertOne({tokenValue: token})
        return
    }

    async checkTokenInBlackList (token: any) {
        const result = await refreshTokenCollection.findOne({tokenValue: token})
        return !!result;
    }
}