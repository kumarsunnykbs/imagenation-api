
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const source = fs.readFileSync(path.join(__dirname, 'password-reset.hbs'), 'utf8');
const sgMail = require('@sendgrid/mail');
const template = Handlebars.compile(source);


const options = (email, locals) => {
	const messageBody = (template({
		otp: locals,
	}));
	console.log('info', `Sending OTP email to ${email}.`, {tags: 'email'});
	return {
		from: `"Realido" <${process.env.EMAIL_USERNAME}>`,
		to: email,
		subject: 'Realido | OTP',
		html: messageBody, // Process template with locals - {passwordResetAddress}
	};
};

function sendMail(argument) {
	sgMail.setApiKey(process.env.MAIL_KEY);
	sgMail.send(options(argument.email, argument.OTP))
		.then(() => {
			return true;
		}).catch((error) => {
			return false;
		});
}


module.exports = sendMail;
