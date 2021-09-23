const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "88887857648-fi55h9403glmm380u40387chsd32sgfu.apps.googleusercontent.com", // ClientID
    "VmCEoRDdcFunA3YsLJOeWKAt", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04erxbqCwnDNWCgYIARAAGAQSNwF-L9Irj-EKq1Pj1vQPlM1i68nyqjigkR_yRVSfTAqRR8sygeYUyEhKdVcnrG2qB378O97SGyU"
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "kautsarmasuara@gmail.com", 
         clientId: "88887857648-fi55h9403glmm380u40387chsd32sgfu.apps.googleusercontent.com",
         clientSecret: "VmCEoRDdcFunA3YsLJOeWKAt",
         refreshToken: "1//04erxbqCwnDNWCgYIARAAGAQSNwF-L9Irj-EKq1Pj1vQPlM1i68nyqjigkR_yRVSfTAqRR8sygeYUyEhKdVcnrG2qB378O97SGyU",
         accessToken: accessToken
    }});

const sendingEmail = (payload) => {
    console.log(payload.email)
    const transporter = smtpTransport

    const mailOptions = {
        from: 'kautsar@gmail.com',
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