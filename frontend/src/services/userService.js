import axios from 'axios'
import { apiUrl, headers, tokenKey } from "../config/config";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";


// Logout user.
export function logout() {
    // remove token from Localstorage 
    localStorage.removeItem(tokenKey)
}

// check if token exist (in localStorage).
export function getCurrentUser() {
    try {
        // try to take the token from localStorage
        const jwt = localStorage.getItem(tokenKey); 
        
        // decode and return him
        return jwtDecode(JSON.parse(jwt).token);

    } catch(ex) {
        // if not exist return null 
        return null
    }
}

// extract user data from localStorage.
export function userData() {
    try {
        // try to take the token from localStorage
        const jwt = JSON.parse(localStorage.getItem(tokenKey)).token; 

        const data = jwtDecode(jwt).userData;
        
        const user = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userImage: data.userImage,
            isAdmin: data.isAdmin,
            isEditor: data.isEditor
        }

        // return him
        return user;

    } catch(ex) {
        // if not exist return null 
        return null
    }
}


// @desc    Register a new user
// @route   [POST] /api/users/register
// @access  Public
// @payload user: { firstName, lastName, email, image, password }
export async function registerUser(user){


    if( ! user.userImage ) {
        user.userImage = "empty"
    }

    try {

        // send user data and get the response (user data + token).
        const { data } = await axios.post(
            `${apiUrl}/api/users/register`,
            user,
        )

        // set the token in local storage (connect the user)
        localStorage.setItem(tokenKey, JSON.stringify(data))


        // return user data outside
        return data;
    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}

// @desc    Login - Auth user & get token.
// @route   [POST] /api/users/login
// @access  Public
// @payload email, password
export async function loginUser(email, password){
    
    try {

        // send email & password and get the response (user data + token).
        const { data } = await axios.post(
            `${apiUrl}/api/users/login`,
             {email, password}
        )

        
        // set the token in local storage (connect the user)
        localStorage.setItem(tokenKey, JSON.stringify(data))


        // return user data outside
        return data;
    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}

// @desc    Get user profile
// @route   [GET] /api/users/profile
// @access  Private
// @payload userId
export async function getUserProfile(userId){
    
    try {

        // send id of the current user, and get all user in = data variable.
        const { data } = await axios.post(
            `${apiUrl}/api/users/profile`,
             userId,
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




const userMethods = {
    registerUser,
    loginUser,
    getUserProfile,
    getCurrentUser,
    logout,
}

export default userMethods