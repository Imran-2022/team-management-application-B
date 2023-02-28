const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN });


module.exports.sendEmail = async function ({ to, from, subject, text, html }) {
    const ms = { to, from, subject, text, html }
    try {
        await mailgun.messages().send(ms, function (error, body) {
            if (error) console.log(error)
            else console.log(body);
        });
    } catch (error) {
        console.error('Error sending test email');
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
}