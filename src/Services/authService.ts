import {jwtService} from "./jwtService";
import {hashHelper} from "../Features/globalFeatures/helper";
import {inputUserType} from "../Types/Types";
import {randomUUID} from "node:crypto";
import {usersRepository} from "../Repository/usersRepository";
import {emailManager} from "../Managers/emailManager";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {compareDesc} from "date-fns";
import {tokenRepository} from "../Repository/tokenBlackListRepository";

export const authService = {

    async login(password: string, neededUser: any) {

        const isPasswordCorrect = await hashHelper.comparePassword(neededUser.password, password)
        if (isPasswordCorrect) {
            return {
                accessToken : await jwtService.createAccessToken(neededUser),
                refreshToken : await jwtService.createRefreshToken(neededUser)
            }
        } else return false
    },

    async registration(userData: inputUserType) {

        const confirmationCode = randomUUID()
        await usersRepository.createUser(userData, confirmationCode)
        return await emailManager.sendConfirmCode(userData.email, confirmationCode)

    },

    async confirmEmail(confirmCode: string) {

        const user = await usersQueryRep.findUserByConfrimCode(confirmCode)
        if (!user) {
            throw new Error ("Go register before trying to use confirmation code")
        }
        if(compareDesc(new Date(),user.emailConfirmationInfo.expirationDate) === -1) {
            throw new Error ("Your confirmation code expired")
        }
        if(user.emailConfirmationInfo.isConfirmed === true) {
            throw new Error ("Your email already confirmed")
        }
        return await usersRepository.confirmEmail(user.id)
    },

    async resendConfirmCode (email: string,) {

        const user = await usersQueryRep.findUserByLoginOrEmail(email)
        const code = randomUUID()
        await usersRepository.changeConfirmCode(code, user!.id)
        return await emailManager.sendConfirmCode(email, code)
    },

    async refreshToken (refreshToken: any) {

        const isTokenValid = refreshToken ? await jwtService.verifyRefreshToken(refreshToken) : null
        if(!isTokenValid) return false
        const result = await tokenRepository.checkTokenInBlackList(refreshToken)
        if (!result) return false
        await tokenRepository.addNewTokenToBlackList(refreshToken)
        return {
            accessToken: await jwtService.createAccessToken(isTokenValid),
            refreshToken: await jwtService.createRefreshToken(isTokenValid)
        }
    },

    async logout (refreshToken: any) {

        const isTokenValid = refreshToken ? await jwtService.verifyRefreshToken(refreshToken) : null
        if(!isTokenValid) return false
        const result = await tokenRepository.checkTokenInBlackList(refreshToken)
        if (!result) return false
        await tokenRepository.addNewTokenToBlackList(refreshToken)
        return true

    }
}