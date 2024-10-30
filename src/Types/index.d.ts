import {refreshTokenInfoType, userViewType} from "./Types";

declare global {
    namespace Express {
        export interface Request {
            user: userViewType
            refreshTokenInfo: refreshTokenInfoType
        }
    }
}
