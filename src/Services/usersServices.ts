import {inputUserType} from "../Types/Types";
import {usersRepository} from "../Repository/usersRepository";


class UsersService {

    async createUser (newUserData: inputUserType) {
        return await usersRepository.createUser(newUserData)
    }

    async deleteUser (id: string) {
        return await usersRepository.deleteUser(id)
    }
}

export const usersService = new UsersService()