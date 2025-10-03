import {nodemailerService} from "../Adapters/nodemailerService";


class EmailManager {

    async sendConfirmCode (emailAddress: string, confirmCode: string, subject: string) {
        try {
            let queryName:string = ""
            if(subject === "Verify your email address") {
                queryName = "code"
            }
            if(subject === "To recover your password") {
                queryName = "recoveryCode"
            }
            const confirmLink = `https://homework-project-guild.vercel.app/auth/registration-confirmation?${queryName}=${confirmCode}`
            await nodemailerService.sendEmail(emailAddress,subject,confirmLink)
            return true
        }catch {
            return false
        }
    }
}

export const emailManager = new EmailManager()