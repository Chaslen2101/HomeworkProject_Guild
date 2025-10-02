import {jwtService} from "./jwtService";
import {hashHelper} from "../Features/globalFeatures/helper";
import {inputUserType, refreshTokenInfoType} from "../Types/Types";
import {randomUUID} from "node:crypto";
import {usersRepository} from "../Repository/usersRepository";
import {emailManager} from "../Managers/emailManager";
import {usersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {compareDesc} from "date-fns";
import {tokenBlackListRepository} from "../Repository/tokenBlackListRepository";
import {sessionsRepository} from "../Repository/sessionsRepository";


class AuthService {

    async login(password: string, neededUser: any, ip: string | undefined, deviceName: string | undefined) {

        const isPasswordCorrect = await hashHelper.comparePassword(neededUser.password, password)
        if (isPasswordCorrect) {
            const deviceId = randomUUID()
            await sessionsRepository.addNewDeviceSession(deviceId, neededUser.id, ip, deviceName)
            return {
                accessToken : await jwtService.createAccessToken(neededUser),
                refreshToken : await jwtService.createRefreshToken(neededUser, deviceId)
            }

        } else return false
    }

    async registration(userData: inputUserType) {

        const confirmationCode = randomUUID()
        await usersRepository.createUser(userData, confirmationCode)
        return await emailManager.sendConfirmCode(userData.email, confirmationCode)

    }

    async confirmEmail(confirmCode: string) {

        const user = await usersQueryRep.findUserByConfirmCode(confirmCode)
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
    }

    async resendConfirmCode (email: string,) {

        const user = await usersQueryRep.findUserByLoginOrEmail(email)
        const code = randomUUID()
        await usersRepository.changeConfirmCode(code, user!.id)
        return await emailManager.sendConfirmCode(email, code)
    }

    async refreshToken (refreshToken: string, refreshTokenInfo: refreshTokenInfoType) {

        await tokenBlackListRepository.addNewTokenToBlackList(refreshToken)

        await sessionsRepository.updateDeviceSession(refreshTokenInfo.deviceId, refreshTokenInfo.id)
        return {
            accessToken: await jwtService.createAccessToken(refreshTokenInfo),
            refreshToken: await jwtService.createRefreshToken(refreshTokenInfo)
        }
    }

    async logout (refreshToken: any, refreshTokenInfo: refreshTokenInfoType) {

        await tokenBlackListRepository.addNewTokenToBlackList(refreshToken)
        await sessionsRepository.deleteOneDeviceSession(refreshTokenInfo.id, refreshTokenInfo.deviceId)
        return true

    }
}

export const authService = new AuthService()