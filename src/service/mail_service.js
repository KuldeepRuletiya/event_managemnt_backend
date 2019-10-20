var nodemailer = require('nodemailer');


module.exports.sending_mail = function(data,callback) {


    console.log("mail send data",data)

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hubpub.com@gmail.com",
            pass: "HUBpub12345"
        }
    });

    mailOptions = {
        from:'pubhub.com@gmail.com',
        to: data,
        subject: 'Sending Email using Node.js',
        text: `<!DOCTYPE html>
        <html>
        <head>
        <title></title>
        </head>
        <body>
        <h1>Hi {{name}} ,welcome to event management.</h1>
        <p>you have been register successfully.</p>
        </body>
        </html>`
    }


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}