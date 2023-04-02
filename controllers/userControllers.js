const bcrypt = require('bcrypt')
const _ = require('lodash')
const { validate, User } = require('../models/user')
const { v4: uuid } = require('uuid')
const { sendEmail } = require('../utils/sendEmail')


const url_live='https://team-management-application.netlify.app'
const url_local='http://localhost:3000'

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = validate({ name, email, password });
    if (error) return res.status(400).send(error.details[0].message);

    let user = {};

    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already Registered');
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const solt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, solt);
    const verificationString = uuid();
    user.verificationString = verificationString;
    const token = user.generateJWT();
    const result = await user.save();

    try {
        await sendEmail({
            to: email,
            from: 'mdimranulhaque202@gmail.com',
            subject: 'Please verify Your Email',
            text: "Thanks for signing Up! to verifiy your email ----",
            html: `<div style="color:red">
            <p>Thanks for signing Up! to verifiy your email ----</p>
            <button style="cursor:pointer"><a href=${`${url_live}/verify-email/${verificationString}`}>Click Here to Verify Email</a></button>
            </div> 
              `,
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    return res.status(201).send({
        message: "registration successfull",
        token: token,
        user: _.pick(result, ['name', 'email', 'isVerified'])
    })
}


module.exports.loginUser = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid email or password");
    const token = user.generateJWT();

    return res.status(200).send({
        message: "login successfull",
        token: token,
        user: _.pick(user, ['name', 'email', 'isVerified'])
    })
}


module.exports.verifyEmailRoute = async (req, res) => {
    const { verificationString } = req.body;
    let user = {}
    user = await User.findOne({ verificationString })
    if (!user) return res.send("error")
    const result = await User.updateOne({ verificationString }, { isVerified: true })
    if (result.modifiedCount > 0) {
        const token = await user.generateJWT();
        return res.status(201).send({
            message: "verifited successfully !",
            token: token,
            user: _.pick(user, ['name', 'email', 'isVerified'])
        })
    }

}



module.exports.ForgotPasswordRoute = async (req, res) => {
    const { email } = req.params;
    let user = await User.findOne({ email })
    if (user) {

        const passwordResetCode = uuid();

        const result = await User.updateOne({ email }, { passwordResetCode })

        if (result.modifiedCount > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'mdimranulhaque202@gmail.com',
                    subject: 'Please reset !',
                    html: `To reset your passsword, click this link:${`${url_live}/new-password/${passwordResetCode}`}`,
                })
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
            return res.send(result)
        }
    }
}


module.exports.resetPasswordRoute = async (req, res) => {
    const { passwordResetCode } = req.params;
    const { new_password } = req.body
    let user = {}
    user = await User.findOne({ passwordResetCode })
    // console.log(user)
    const solt = await bcrypt.genSalt(10)
    const newPasswordHash = await bcrypt.hash(new_password, solt)
    const result = await User.updateOne({ passwordResetCode }, { passwordResetCode:"",password:newPasswordHash })
    
    if(result.modifiedCount>0){
        const token = user.generateJWT();
       return res.send(_.pick(user, ['name', 'email', 'isVerified']))
    }
}


module.exports.getUser=async(req,res)=>{
    const user = await User.find({})
    const selectedUserData=user.map(dt=>{
        const {name,email,_id}=dt;
        return {name,email,_id}

    })
    res.send({data:selectedUserData})
}