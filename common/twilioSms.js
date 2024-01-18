const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


function twilioOtpAuth(values) {
	return new Promise((resolve, reject) => {
		client.messages
			.create({
				body: `OTP: ${values.OTP}`,
				to: `${values.number}`, // Text this number
				from: process.env.TWILIO_FROM_NUMBER, // From a valid Twilio number
			})
			.then((message) => {
				resolve(message);
			})
			.catch((error) => {
				let errorMessage = error.message;
				errorMessage = errorMessage.split(';');
				errorMessage = errorMessage[0] ? errorMessage[0] : errorMessage;
				reject(errorMessage);
			});
	});
}


module.exports = twilioOtpAuth;
