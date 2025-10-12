import {refreshTokenInfoType, UserViewType} from "./Types";

declare global {
    namespace Express {
        export interface Request {
            user: UserViewType
            refreshTokenInfo: refreshTokenInfoType
        }
    }
}
