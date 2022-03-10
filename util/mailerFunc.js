const nodemailer = require("nodemailer");

const mailerFunc = async (data) => {
  try {
    const { toAddress, mailSubject, mailHtml } = data;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL_ID,
        pass: process.env.SENDER_MAIL_PWD,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_MAIL_ID,
      to: toAddress,
      subject: mailSubject,
      html: mailHtml,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    console.log(err.message, " err-mailFunc");
    throw err;
  }
};

module.exports = mailerFunc;
