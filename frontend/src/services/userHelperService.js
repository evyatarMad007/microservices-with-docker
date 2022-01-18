import axios from 'axios';
import { apiUrl, headers } from '../config/config'





// @desc    Send to server the user's email (To get a password reset link).
// @route   [POST] /user-helper/forgot-password
// @access  Public
// @payload {email}.
export async function sendResetPassToEmail(email){
    
    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.post(
            `${apiUrl}/user-helper/forgot-password`,
            {email},
        )

        // return all data outside 
        return data
             
    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}


// @desc    get reset-password EJS html.
// @route   [PUT] /user-helper/reset-password/:token
// @access  Public
// @payload /:id/:token
export async function updateNewUserPassword(password, token){
    console.log('userHelper Service ------', password);
    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.put(
            `${apiUrl}/user-helper/reset-password/${token}`,
            {password},
        )
        
        // return all data outside.
        return data

    }  catch (err) {
        if( err.response ) {
            return err.response.data.message
        }
    }
}
