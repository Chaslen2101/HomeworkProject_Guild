import {inputUserType} from "../Features/Types";
import {usersRepository} from "../Repository/usersRepository";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";

export const createUserService = async (newUserData: inputUserType) => {
    if(await usersQueryRep.findUserByLoginOrEmail(newUserData.email)) throw new Error("email")
    if(await usersQueryRep.findUserByLoginOrEmail(newUserData.login)) throw new Error("login")
    return await usersRepository.createUser(newUserData)
}

export const deleteUserService = async (id: string) => {
    return await usersRepository.deleteUser(id)
}