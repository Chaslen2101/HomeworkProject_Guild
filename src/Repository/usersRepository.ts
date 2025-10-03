import {userCollection} from "../db/MongoDB";
import {existUserType, inputUserType} from "../Types/Types";
import {ObjectId} from "mongodb";
import {hashHelper} from "../Features/globalFeatures/helper";
import {UUID} from "node:crypto";
import {add} from "date-fns"
import {injectable} from "inversify";


@injectable()
export class UsersRepository {

    async createUser (newUserData: inputUserType, confirmCode?: UUID) {
        const hashedPassword = await hashHelper.hashNewPassword(newUserData.password)
        const newUser: existUserType = {
            id: new ObjectId().toString(),
            login: newUserData.login,
            email: newUserData.email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            emailConfirmationInfo: {
                confirmationCode: confirmCode ? confirmCode : null,
                expirationDate: add(new Date(),{hours: 1}),
                isConfirmed: false
            }
        }
        await userCollection.insertOne(newUser)
        return newUser.id
    }

    async deleteUser (id: string) {
        const result = await userCollection.deleteOne({id: id})
        return result.deletedCount !== 0
    }

    async confirmEmail (userId:string) {
        const result = await userCollection.updateOne(
            {id: userId},
            {$set:{"emailConfirmationInfo.isConfirmed": true}}
        )
        return result.modifiedCount === 1
    }

    async changeConfirmCode (code: string, userId: string) {
        const result = await userCollection.updateOne(
            {id: userId},
            {$set:{"emailConfirmationInfo.confirmationCode": code}}
        )
        return result.modifiedCount === 1
    }
}

