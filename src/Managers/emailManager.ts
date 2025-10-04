import {nodemailerService} from "../Adapters/nodemailerService";


class EmailManager {

    async sendConfirmCode (emailAddress: string, confirmCode: string, subject: string) {
        try {
            // console.log(confirmCode)
            let queryName:string = ""
            if(subject === "Verify your email address") {
                queryName = "registration-confirmation?code"
            }
            if(subject === "To recover your password") {
                queryName = "password-recovery?recoveryCode"
            }
            const confirmLink = `https://homework-project-guild.vercel.app/auth/${queryName}=${confirmCode}`
            await nodemailerService.sendEmail(emailAddress,subject,confirmLink)
            return true
        }catch (e) {
            console.error(e)
            return false
        }
    }
}

export const emailManager = new EmailManager()