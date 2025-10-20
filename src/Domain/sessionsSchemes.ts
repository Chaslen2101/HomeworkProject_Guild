import mongoose, {Schema} from "mongoose";
import {SessionsInfoDBType} from "../Types/Types";
import {SessionsModel} from "../db/MongoDB";

export const SessionInfoSchema: Schema<SessionsInfoDBType> = new mongoose.Schema ({
    ip: String,
    title: String,
    lastActiveDate: Schema.Types.Date,
    deviceId: String,
    userId: String,
},
    {
        statics: {
            createNewSession(deviceId: string, userId: string, ip: string | undefined, deviceName: string | undefined) {
                return new SessionsModel({
                    ip: ip,
                    title: deviceName,
                    lastActiveDate: new Date(),
                    deviceId: deviceId,
                    userId: userId
                })
            }
        }
    }
)