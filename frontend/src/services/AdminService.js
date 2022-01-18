import axios from 'axios'
import { apiUrl, headers } from "../config/config";
import { toast } from "react-toastify";



// --------------- Admin Privileges ----------------

// @desc    get all users
// @route   [GET] /api/users/get-all-users
// @access  Admin.
// @payload [no payload]
export async function getAllUsers() {

    try {
        // get all users
        const { data } = await axios.get(
            `${apiUrl}/api/users/get-all-users`,
            {headers}
        )

        // return all data outside 
        return data 
            
    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}


// @desc    set user permissions (basic (only view), Editor , Admin)
// @route   [GET] /api/users/user-permissions
// @access  Admin.
// @payload {userEmail, userAuth}
export async function userPermissions(userEmail, userAuth){
    
    const user = {userEmail,userAuth}
    try {

        // send userEmail, userAuth
        const { data } = await axios.put(
            `${apiUrl}/api/users/user-permissions`,
            user,
            {headers}
        )

        // return all data outside.
        return data


    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}


// @desc    get a single user.
// @route   [GET] /api/users/:id
// @access  Admin.
// @payload 

// @desc    create user.
// @route   [POST] /api/users/createUser
// @access  Admin.
// @payload 

// @desc    update user.
// @route   [PUT] /api/users/updateUser
// @access  Admin.
// @payload 

// @desc    remove user.
// @route   [DELETE] /api/users/deleteUser
// @access  Admin.
// @payload 


const userMethods = {
    getAllUsers,
    userPermissions
}

export default userMethods