import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "gmail",
    auth:{
        user: "Chaslen2101.Itincubator@gmail.com",
        pass: "emailpassword"
    }
})

export const nodemailerService = {

    async sendEmail (emailAddress: string, subject: string, text: string) {

        await transport.sendMail({
            from: "Chaslen2101 <Chaslen2101.Itincubator@gmail.com>",
            to: emailAddress,
            subject: subject,
            text: text
        })
        return
    }
}