const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: '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'
    }
}));

// const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com', // Office 365 server
//     port: 587,     // secure SMTP
//     secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
//     auth: {
//         user: 'danieltoor@unisabana.edu.co',
//         pass: '3118419684Forever#'
//     },
//     tls: {
//         ciphers: 'SSLv3'
//     }
// });

module.exports={
    transporter
}