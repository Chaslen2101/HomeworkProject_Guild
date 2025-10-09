import {refreshTokenModel} from "../db/MongoDB";
import {injectable} from "inversify";


@injectable()
export class TokenBlackListRepository {

    async addNewTokenToBlackList (token: any) {
        await refreshTokenModel.insertOne({tokenValue: token})
        return
    }

    async checkTokenInBlackList (token: any): Promise<boolean> {
        const result = await refreshTokenModel.findOne({tokenValue: token})
        return !!result;
    }
}