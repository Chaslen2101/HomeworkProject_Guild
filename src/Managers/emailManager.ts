import {nodemailerService} from "../Adapters/nodemailerService";


class EmailManager {

    async sendConfirmCode (emailAddress: string, confirmCode: string) {
        try {
            const confirmLink = `https://homework-project-guild.vercel.app/auth/registration-confirmation?code=${confirmCode}`
            await nodemailerService.sendEmail(emailAddress,"Verify your email address", confirmLink)
            return true
        }catch {
            return false
        }
    }
}

export const emailManager = new EmailManager()