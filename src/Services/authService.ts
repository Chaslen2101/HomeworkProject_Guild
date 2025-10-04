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

        const subject: string = "Verify your email address"
        const confirmationCode = randomUUID()
        await this.usersRepository.createUser(userData, confirmationCode)
        return await emailManager.sendConfirmCode(userData.email, confirmationCode,subject)

    }

    async confirmEmailForRegistration(confirmCode: string) {

        const user = await this.usersQueryRep.findUserByEmailConfirmCode(confirmCode)
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

    async resendConfirmCodeForRegistration (email: string,) {

        const subject: string = "Verify your email address"
        const user = await this.usersQueryRep.findUserByLoginOrEmail(email)
        if(!user){
            return false
        }
        const code = randomUUID()
        await this.usersRepository.changeEmailConfirmCode(code, user.id)
        return await emailManager.sendConfirmCode(email, code,subject)
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

    async sendPasswordRecoveryCode (email: string) {

        const subject: string = "To recover your password"
        const code = randomUUID()
        const isEmailSent = await emailManager.sendConfirmCode(email,code,subject)
        if(!isEmailSent) {
            throw new Error ("Cannot send email, manager problems")
        }

        const user = await this.usersQueryRep.findUserByLoginOrEmail(email)
        if (!user) {
            throw new Error ("User doesnt exists")
        }

        console.log("email sent")
        const isConfirmCodeChanged = await this.usersRepository.changePasswordConfirmCode(code,user.id)
        if(!isConfirmCodeChanged) {
            throw new Error ("Cannot change code through repo")
        }

        return true
    }

    async recoverPassword (newPassword: string, recoveryCode: string) {

        const user = await this.usersQueryRep.findUserByPasswordRecoveryCode(recoveryCode)

        if(!user) {
            throw new Error ("User doesnt exists")
        }
        if(compareDesc(new Date(),user.passwordRecoveryCode.expirationDate) === -1) {
            throw new Error ("Your confirmation code expired")
        }

        const isPasswordChanged = await this.usersRepository.changePassword(newPassword, user.id)
        if(!isPasswordChanged) {
            throw new Error ("Cannot change password through repo")
        }

        return
    }
}

