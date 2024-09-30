import {inputUserType} from "../Types/Types";
import {usersRepository} from "../Repository/usersRepository";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";

export const userService = {

    async createUser (newUserData: inputUserType) {

        if (await usersQueryRep.findUserByLoginOrEmail(newUserData.email)) {
            throw new Error("email")
        }
        if (await usersQueryRep.findUserByLoginOrEmail(newUserData.login)) {
            throw new Error("login")
        }
        return await usersRepository.createUser(newUserData)
    },

    async deleteUser (id: string) {
        return await usersRepository.deleteUser(id)
    }
}