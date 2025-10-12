import {usersModel} from "../db/MongoDB";
import {UserClass, InputUserType} from "../Types/Types";
import {ObjectId} from "mongodb";
import {hashHelper} from "../Features/globalFeatures/helper";
import {add} from "date-fns"
import {injectable} from "inversify";


@injectable()
export class UsersRepository {

    async createUser (newUserData: InputUserType, confirmCode?: string): Promise<string> {

        const hashedPassword = await hashHelper.hashNewPassword(newUserData.password)
        const newUser: UserClass = new UserClass(
            new ObjectId().toString(),
            newUserData.login,
            newUserData.email,
            hashedPassword,
            new Date(),
            {
                confirmationCode: confirmCode ? confirmCode : null,
                expirationDate: add(new Date(),{hours: 1}),
                isConfirmed: false
            },
            {
                confirmationCode: "",
                expirationDate: new Date(),
            }
        )
        await usersModel.insertOne(newUser)
        return newUser.id
    }

    async deleteUser (id: string): Promise<boolean> {

        const result = await usersModel.deleteOne({id: id})
        return result.deletedCount !== 0
    }

    async confirmEmail (userId:string): Promise<boolean> {

        const result = await usersModel.updateOne(
            {id: userId},
            {$set:{"emailConfirmationInfo.isConfirmed": true}}
        )
        return result.modifiedCount === 1
    }

    async changeEmailConfirmCode (code: string, userId: string): Promise<boolean> {

        const result = await usersModel.updateOne(
            {id: userId},
            {$set:{"emailConfirmationInfo.confirmationCode": code}}
        )
        return result.modifiedCount === 1
    }

    async changePasswordConfirmCode (code: string, userId: string): Promise<boolean> {

        const expirationDate: string = add(new Date(),{hours: 1}).toISOString()
        const result = await usersModel.updateOne(
            {id: userId},
            {$set:
                        {"passwordRecoveryCode.confirmationCode": code,
                         "passwordRecoveryCode.expirationDate": expirationDate},
            }
        )
        return result.modifiedCount === 1
    }

    async changePassword (newPassword: string, userId: string): Promise<boolean> {

        const result = await usersModel.updateOne(
            {id: userId},
            {$set:{password:newPassword}}
        )

        return result.modifiedCount === 1
    }
}

