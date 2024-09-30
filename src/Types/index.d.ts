import {existUserType} from "./Types";

declare global {
    namespace Express {
        export interface Request {
            user: existUserType
        }
    }
}
