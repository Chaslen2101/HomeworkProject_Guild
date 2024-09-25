import {inputUserType} from "../Features/Types";
import {usersRepository} from "../Repository/usersRepository";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";

export const createUserService = async (newUserData: inputUserType) => {

    if(await usersQueryRep.findUserByLoginOrEmail(newUserData.email)) {
        return "Email"
    }else if(await usersQueryRep.findUserByLoginOrEmail(newUserData.login)) {
        return "Login"
    }else return await usersRepository.createUser(newUserData)
}

export const deleteUserService = async (id: string) => {
    return await usersRepository.deleteUser(id)
}