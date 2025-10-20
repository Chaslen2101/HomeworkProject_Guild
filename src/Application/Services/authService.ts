import {jwtService} from "../../Infrastructure/Features/GlobalFeatures/jwtService";
import {hashHelper} from "../../Infrastructure/Features/GlobalFeatures/helper";
import {
    UserInputType,
    RefreshTokenPayload,
    SessionsInfoInstanceType,
    UserInstanceType,
} from "../../Types/Types";
import {randomUUID} from "node:crypto";
import {UsersRepository} from "../../Infrastructure/Repository/usersRepository";
import {emailManager} from "../Managers/emailManager";
import {UsersQueryRep} from "../../Infrastructure/QueryRep/usersQueryRep";
import {compareDesc} from "date-fns";
import {TokenBlackListRepository} from "../../Infrastructure/Repository/tokenBlackListRepository";
import {SessionsRepository} from "../../Infrastructure/Repository/sessionsRepository";
import {inject, injectable} from "inversify";
import {SessionsModel, UsersModel} from "../../db/MongoDB";


@injectable()
export class AuthService {

    constructor(
        @inject(UsersRepository) protected usersRepository: UsersRepository,
        @inject(UsersQueryRep) protected usersQueryRep: UsersQueryRep,
        @inject(SessionsRepository) protected sessionsRepository: SessionsRepository,
        @inject(TokenBlackListRepository) protected tokenBlackListRepository: TokenBlackListRepository
    ) {}

    async login(password: string, neededUser: any, ip: string | undefined, deviceName: string | undefined) {

        const isPasswordCorrect: boolean = await hashHelper.comparePassword(neededUser.password, password)
        if (isPasswordCorrect) {
            const deviceId: string = randomUUID().toString()
            const newSession: SessionsInfoInstanceType = await SessionsModel.createNewSession(deviceId, neededUser.id, ip, deviceName)
            await this.sessionsRepository.save(newSession)
            return {
                accessToken : await jwtService.createAccessToken(neededUser),
                refreshToken : await jwtService.createRefreshToken(neededUser, deviceId)
            }

        } else return false
    }

    async registration(newUserData: UserInputType) {

        const subject: string = "Verify your email address"
        const confirmationCode: string = randomUUID().toString()
        const hashedPassword: string = await hashHelper.hashNewPassword(newUserData.password)
        await UsersModel.createNewUser(newUserData,hashedPassword, confirmationCode)
        return await emailManager.sendConfirmCode(newUserData.email, confirmationCode,subject)

    }

    async confirmEmailForRegistration(confirmCode: string): Promise<boolean> {

        const user: UserInstanceType | null = await this.usersRepository.findByEmailConfirmCode(confirmCode)
        if (!user) {
            throw new Error ("Go register before trying to use confirmation code")
        }
        if(!user.emailConfirmationInfo.expirationDate) {
            throw new Error ("You have no confirmation code")
        }
        if(compareDesc(new Date(),user.emailConfirmationInfo.expirationDate) === -1) {
            throw new Error ("Your confirmation code expired")
        }
        if(user.emailConfirmationInfo.isConfirmed) {
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
        const code: string = randomUUID().toString()
        await this.usersRepository.changeEmailConfirmCode(code, user.id)
        return await emailManager.sendConfirmCode(email, code,subject)
    }

    async updateRefreshToken (refreshToken: string, refreshTokenInfo: RefreshTokenPayload) {

        await this.tokenBlackListRepository.addNewTokenToBlackList(refreshToken)
        await this.sessionsRepository.updateDeviceSession(refreshTokenInfo.deviceId, refreshTokenInfo.id)

            return {
                accessToken: await jwtService.createAccessToken(refreshTokenInfo),
                refreshToken: await jwtService.createRefreshToken(refreshTokenInfo)
            }
        }

    async logout (refreshToken: any, refreshTokenInfo: RefreshTokenPayload) {

        await this.tokenBlackListRepository.addNewTokenToBlackList(refreshToken)
        await this.sessionsRepository.deleteOneDeviceSession(refreshTokenInfo.id, refreshTokenInfo.deviceId)
        return true

    }

    async sendPasswordRecoveryCode (email: string) {

        const subject: string = "To recover your password"
        const code: string = randomUUID().toString()
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

    async recoverPassword (newPassword: string, recoveryCode: string): Promise<boolean> {

        const user: UserInstanceType | null= await this.usersRepository.findByPasswordConfirmCode(recoveryCode)

        if(!user) {
            throw new Error ("User doesnt exists")
        }
        if(!user.passwordRecoveryCode.expirationDate) {
            throw new Error ("You have no confirmation code")
        }
        if(compareDesc(new Date(),user.passwordRecoveryCode.expirationDate) === -1) {
            throw new Error ("Your confirmation code expired")
        }

        const hashedPassword: string = await hashHelper.hashNewPassword(newPassword)
        const isPasswordChanged: boolean = await this.usersRepository.changePassword(hashedPassword, user.id)
        if(!isPasswordChanged) {
            throw new Error ("Cannot change password through repo")
        }

        return true
    }
}

