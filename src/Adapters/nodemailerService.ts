import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "Chaslen2101.itincubator@gmail.com",
        pass: "xall mgjd luaq awxt"
    }
})

export const nodemailerService = {

    async sendEmail (emailAddress: string, subject: string, text: string) {

        await transport.sendMail({
            from: '"Chaslen2101" <Chaslen2101.itincubator@gmail.com>',
            to: emailAddress,
            subject: subject,
            text: text
        })
        return
    }
}