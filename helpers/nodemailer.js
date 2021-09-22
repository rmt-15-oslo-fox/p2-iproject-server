const nodemailer = require('nodemailer')

const sendingEmail = (payload) => {
    console.log(payload.email)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wppq.yt@gmail.com',
            pass: 'KataSandi;'
        }
    })

    const mailOptions = {
        from: 'wppq.yt@mail.com',
        to: `${payload.email}`,
        subject : `Hai ${payload.email} Register in CovidApp`,
        text: `Hai ${payload.username}\n\n
                Thanks to join with us. When application updated
                we will give information to you`
    }

    transporter.sendMail(mailOptions, (err , info) => {
        if(err) throw err;
        console.log(info.response)
    })
}

module.exports = sendingEmail