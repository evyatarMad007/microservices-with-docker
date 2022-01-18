import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Employee from '../models/employeeModel.js'


// @desc    get all users.
// @route   [GET] /api/users/get-all-users
// @access  Admin.
// @payload [no payload]
const getAllUsers = asyncHandler(async (req, res) => {
    
     // find all users.
     const users = await User.find({})
        
     // if u find them, send it to client.
     if(users) {
         // send it to client 
         res.json(users)
     } else {
         res.status(404)
         throw new Error('The users not found, something wrong...')
     }  
})


// @desc    set user permissions (basic (only view), Editor , Admin)
// @route   [GET] /api/users/user-permissions
// @access  Admin.
// @payload {userEmail, userAuth}
const setUserPermissions = asyncHandler(async (req, res) => {

    // take the data from client.
    const { userEmail, userAuth } = req.body;
    
    // define variables.
    let isEditor, isAdmin;

    // check userAuth selected.
    if ( userAuth === 'Basic') {
        isEditor = false
        isAdmin = false
    }
    if ( userAuth === 'Editor') {
        isEditor = true
        isAdmin = false
    }
    if ( userAuth === 'Administrator') {
        isEditor = false
        isAdmin = true
    }


    // find the email of current user, and replace the data with isEditor,isAdmin variable.
    const user = await User.findOneAndUpdate({email: userEmail} , {isEditor , isAdmin});

    // if user updated? send the data to client.
    if( user ) {
        res.status(201).json({
            message: "user has updated.",
            userEmail: user.email,
            isEditor: user.isEditor,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('The user with the given Email not found')
    }  
})

export {
    getAllUsers,
    setUserPermissions
}