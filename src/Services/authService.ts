import {jwtService} from "../Features/globalFeatures/jwtService";
import {hashHelper} from "../Features/globalFeatures/helper";
import {inputUserType, refreshTokenInfoType} from "../Types/Types";
import {randomUUID} from "node:crypto";
import {UsersRepository} from "../Repository/usersRepository";
import {emailManager} from "../Managers/emailManager";
import {UsersQueryRep} from "../Repository/queryRep/usersQueryRep";
import {compareDesc} from "date-fns";
import {TokenBlackListRepository} from "../Repository/tokenBlackListRepository";
import {SessionsRepository} from "../Repository/sessionsRepository";
import {inject, injectable} from "inversify";
import {BlogsRepository} from "../Repository/blogsRepository";


@injectable()
export class AuthService {

    constructor(
        @inject(UsersRepository) protected usersRepository: UsersRepository,
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep,
        @inject(SessionsRepository) protected sessionsRepository: SessionsRepository,
        @inject(TokenBlackListRepository) protected tokenBlackListRepository: TokenBlackListRepository
    ) {}

    async login(password: string, neededUser: any, ip: string | undefined, deviceName: string | undefined) {

        const isPasswordCorrect = await hashHelper.comparePassword(neededUser.password, password)
        if (isPasswordCorrect) {
            const deviceId = randomUUID()
            await this.sessionsRepository.addNewDeviceSession(deviceId, neededUser.id, ip, deviceName)
            return {
                accessToken : await jwtService.createAccessToken(neededUser),
                refreshToken : await jwtService.createRefreshToken(neededUser, deviceId)
            }

        } else return false
    }

    async registration(userData: inputUserType) {

        const confirmationCode = randomUUID()
        await this.usersRepository.createUser(userData, confirmationCode)
        return await emailManager.sendConfirmCode(userData.email, confirmationCode)

    }

    async confirmEmail(confirmCode: string) {

        const user = await this.usersQueryRep.findUserByConfirmCode(confirmCode)
        if (!user) {
            throw new Error ("Go register before trying to use confirmation code")
        }
        if(compareDesc(new Date(),user.emailConfirmationInfo.expirationDate) === -1) {
            throw new Error ("Your confirmation code expired")
        }
        if(user.emailConfirmationInfo.isConfirmed === true) {
            throw new Error ("Your email already confirmed")
        }
        return await this.usersRepository.confirmEmail(user.id)
    }

    async resendConfirmCode (email: string,) {

        const user = await this.usersQueryRep.findUserByLoginOrEmail(email)
        const code = randomUUID()
        await this.usersRepository.changeConfirmCode(code, user!.id)
        return await emailManager.sendConfirmCode(email, code)
    }

    async refreshToken (refreshToken: string, refreshTokenInfo: refreshTokenInfoType) {

        await this.tokenBlackListRepository.addNewTokenToBlackList(refreshToken)

        await this.sessionsRepository.updateDeviceSession(refreshTokenInfo.deviceId, refreshTokenInfo.id)
        return {
            accessToken: await jwtService.createAccessToken(refreshTokenInfo),
            refreshToken: await jwtService.createRefreshToken(refreshTokenInfo)
        }
    }

    async logout (refreshToken: any, refreshTokenInfo: refreshTokenInfoType) {

        await this.tokenBlackListRepository.addNewTokenToBlackList(refreshToken)
        await this.sessionsRepository.deleteOneDeviceSession(refreshTokenInfo.id, refreshTokenInfo.deviceId)
        return true

    }
}

