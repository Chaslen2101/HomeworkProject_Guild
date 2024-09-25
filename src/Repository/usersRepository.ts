import {userCollection} from "../db/MongoDB";
import {existUserType, inputUserType} from "../Features/Types";
import {hashNewPassword} from "../Features/helper";
import {ObjectId} from "mongodb";


export const usersRepository = {

    async createUser (newUserData: inputUserType) {
        const hashedPassword = await hashNewPassword(newUserData.password)
        const newUser: existUserType = {
            id: new ObjectId().toString(),
            login: newUserData.login,
            email: newUserData.email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        }
        await userCollection.insertOne(newUser)
        return newUser.id
    },
    async deleteUser (id: string) {
       const result = await userCollection.deleteOne({id: id})
       return result.deletedCount !== 0
    }
}