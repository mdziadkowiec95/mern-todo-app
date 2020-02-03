const config = require('config')
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
      apiKey: config.get('SENDGRID_API_KEY')
  })
);

exports.sendEmail = async (options) => new Promise((resolve, reject) => {  
    transport.sendMail(options).then(([res]) => {
      resolve(res)
    })
    .catch(err => {        
      reject(err)
    });
})

exports.logSendEmailError = (err) => {
    console.log('Errors occurred, failed to deliver verification email');

    if (err.response && err.response.body && err.response.body.errors) {
        err.response.body.errors.forEach(error => {
            console.log('%s: %s', error.field, error.message)
        });
    }
}