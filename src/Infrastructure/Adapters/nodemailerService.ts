import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host:"smtp.sendgrid.net",
    port: 587,
    auth:{
        user: process.env.SENDGREED_USERNAME,
        pass: process.env.SENDGREED_PASSWORD
    }
})

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth:{
//         user: "chaslen2101.itincubator@gmail.com",
//         pass:
//     }
// })

export const nodemailerService = {

    async sendEmail (emailAddress: string, subject: string, text: string) {

        await transporter.sendMail({
            from: '"Chaslen2101" <Chaslen2101.itincubator@gmail.com>',
            to: emailAddress,
            subject: subject,
            html: `<h1>Password recovery</h1>
            <p>To finish password recovery please follow the link below:
            <a href=${text}>recovery password</a></p>`
    })
        return
    }
}