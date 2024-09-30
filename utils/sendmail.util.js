import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        
        service: 'yashpawar12122004@gmail.com',
        auth: {
            user: 'yashpawar12122004@gmail.com',
            
            pass: 'nwxb yuwl uioz dzkc',
           
        },
    });

    const mailOptions = {
        from: 'yashpawar12122004@gmail.com',
        // from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;