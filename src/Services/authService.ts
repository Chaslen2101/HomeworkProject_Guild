import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {comparePassword} from "../Features/helper";

export const userLoginService = async (password: string, loginOrEmail: string) => {
    const neededUser = await usersQueryRep.findUserByLoginOrEmail(loginOrEmail)
    if (neededUser) {
        const isPasswordCorrect = await comparePassword(neededUser.password, password)
        if (isPasswordCorrect) return true
    }return false
}