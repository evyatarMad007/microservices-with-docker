import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc    Register a new user
// @route   [POST] /api/users/register
// @access  Public
// @payload user: { firstName, lastName, email, password }
const registerUser = asyncHandler(async (req, res) => {

    
    // take the data from client
    const { firstName, lastName, email, userImage, password } = req.body;
    

    // check if email exsist.
    const userExists = await User.findOne({ email })
    if( userExists ) {
        res.status(400)
        throw new Error('User already exists')
    }

    
    // create a new user.
    const user = await User.create({
        firstName,
        lastName,
        email,
        userImage,
        password
    })


    // if user created? send the data to client.
    if( user ) {
        res.status(201).json({ 
            token: generateToken(
                user._id, 
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userImage: user.userImage,
                    isAdmin: user.isAdmin,
                    isEditor: user.isEditor,
                }
            ),
        })
    } else {
        res.status(400)
        throw new Error('This mail already exists')
    }
})

// @desc    Login - Auth user & get token.
// @route   [POST] /api/users/login
// @access  Public
// @payload email, password
const authUser = asyncHandler(async (req, res) => {
    const { email,password } = req.body;

    // check if email exsist
    const user = await User.findOne({email})

    // check the password if true 
    if (user && (await user.matchPassword(password))) {
        // send data to client 
        res.json({ 
            token: generateToken(
                user._id, 
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userImage: user.userImage,
                    isAdmin: user.isAdmin,
                    isEditor: user.isEditor,
                }
            ),
        })
    } else {
        res.status(401)
        throw new Error('No account found, incorrect email or password')
    }
})

// @desc    Get user profile
// @route   [GET] /api/users/profile
// @access  Private
// @payload userId
const getUserProfile = asyncHandler(async (req, res) => {
    // search the current user byid 
    const user = await User.findById(req.body.userId)

    // if u find him, send user data to the client.
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    getUserProfile
}