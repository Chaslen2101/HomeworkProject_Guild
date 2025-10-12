import {InputUserType} from "../Types/Types";
import {UsersRepository} from "../Repository/usersRepository";
import {inject, injectable} from "inversify";


@injectable()
export class UsersService {

    constructor(
        @inject(UsersRepository) protected usersRepository: UsersRepository
    ) {}

    async createUser (newUserData: InputUserType) {
        return await this.usersRepository.createUser(newUserData)
    }

    async deleteUser (id: string) {
        return await this.usersRepository.deleteUser(id)
    }
}

