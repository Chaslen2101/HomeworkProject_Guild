import {inputUserType} from "../Features/Types";
import {usersRepository} from "../Repository/usersRepository";

export const createUserService = async (newUserData: inputUserType) => {
    return await usersRepository.createUser(newUserData)
}

export const deleteUserService = async (id: string) => {
    await usersRepository.deleteUser(id)
    return
}