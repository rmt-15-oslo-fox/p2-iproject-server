const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "615871655779-7qcorqh2715s0d0410vpqumg159510v2.apps.googleusercontent.com",
  "fPIcXCI1nA3qt4HtQb_-jmST",
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04o3i_HSmbZaoCgYIARAAGAQSNwF-L9IrgErG5ebw6uciFFhsTz1VN85C-8QtrFPmNiI_CKG-EXJO6MkyQIXVVFpJ4QRFynaf68I",
});
const accessToken = oauth2Client.getAccessToken();

function sendNodemailer(emailTo, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "jonathansentosa80@gmail.com",
      clientId:
        "615871655779-7qcorqh2715s0d0410vpqumg159510v2.apps.googleusercontent.com",
      clientSecret: "fPIcXCI1nA3qt4HtQb_-jmST",
      refreshToken:
        "1//04o3i_HSmbZaoCgYIARAAGAQSNwF-L9IrgErG5ebw6uciFFhsTz1VN85C-8QtrFPmNiI_CKG-EXJO6MkyQIXVVFpJ4QRFynaf68I",
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: "jonathansentosa80@gmail.com",
    to: `${emailTo}`,
    subject: `${subject}`,
    html: `${text}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendNodemailer;
