import {nodemailerService} from "../Adapters/nodemailerService";

export const emailManager = {

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