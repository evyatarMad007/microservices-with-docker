import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import  jwt  from 'jsonwebtoken'
import sendgrid from '@sendgrid/mail';
import bcrypt from 'bcrypt';


// @desc    Receive the email from the user, and send him a password reset link to the email.
// @route   [POST] /user-helper/forgot-password
// @access  Public
// @payload email.
const sendResetPassToEmail = asyncHandler(async (req, res) => {
    const { email } = req.body

    // step (1) check if user exist in DB
    const user = await User.findOne({ email })

    if( ! user ) {
        res.status(400)
        throw new Error('Email Not exist')
    }


    // step (2) generate a token link valid for 10mins.
    const token = generateToken(user.id, {email: user.email}, '600s')

    // step (3) create a link with the token 
    const link = `http://localhost:3000/user-helper/reset-password/${token}`;


    // step (4) send the link to user Email.
    const SENDGRID_API_KEY = "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";
    sendgrid.setApiKey(SENDGRID_API_KEY)

    const msg = {
        to: email,
        from: 'eviyatar0010@gmail.com',
        subject: `Password reset - employee management system ${Date.now()}`,
        html: `<div style="
        width: 85%;
        max-width: 45rem;
        height: 350px;
        border: 1px solid #575a6038;
        margin: 0 auto;
        display: grid;
        text-align: center;
        border-radius: 10px;
        ">
            <h1 style="color: black; font-family: roboto; font-size: 1.5rem; font-weight: 500;">For password reset - go to the following link</h1>
            <br>
            <p style="color: black; font-family: roboto; font-size: 1rem; font-weight: 500;">⏳ The link is valid for 10 minutes from now ⏳</p>
            <br>
            <br>
            <strong style="color: #257cff; font-family: 'Roboto'; text-decoration: none;">${link}</strong>
        </div>`,
     }
    
     // step (5) message to client.
     sendgrid
        .send(msg)
        .then((r) => {
          console.log('Email sent\n', r)
        //   console.log('Email sent\n')
          // seccess 
          res.send("OK")
        })
        .catch((err) => {
          console.error(err)
          // fails
          res.send('Sending Failed')
        })
})

// @desc    Update a new password from the user, encrypt it, and update it.
// @route   [PUT] /user-helper/reset-password/:token
// @access  Public
// @payload  { password }, /:token
const updateNewUserPassword = asyncHandler(async (req, res) => {
     

    const { token } = req.params; 
    const { password } = req.body;
    
    // open the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // extract the id and email
    const {id} = decoded;
 
        if( password ) {

            // encrypt the password 
            const salt = await bcrypt.genSalt(10)
            const encryptPassword = await bcrypt.hash(password,salt)

            // find the id of current user, and replace the password.
            const user = await User.findOneAndUpdate({_id: id} , {password: encryptPassword});

            // if user updated? send the data to client.
            if( user ) {
                res.status(201).json({ message: 'OK'})
            } else {
                res.status(404)
                throw new Error('The User with the given ID not found')
            }
        }
})


export {
    sendResetPassToEmail,
    updateNewUserPassword
}