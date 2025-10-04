import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host:"smtp.sendgrid.net",
    port: 587,
    auth:{
        user: process.env.SENDGREED_USERNAME,
        pass: process.env.SENDGREED_PASSWORD
    }
})

export const nodemailerService = {

    async sendEmail (emailAddress: string, subject: string, text: string) {

        await transporter.sendMail({
            from: '"Chaslen2101" <Chaslen2101.itincubator@gmail.com>',
            to: emailAddress,
            subject: subject,
            text: text
        })
        return
    }
}