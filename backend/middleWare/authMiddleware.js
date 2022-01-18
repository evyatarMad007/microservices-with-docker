import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// check if not exist token in client (in authorization of the req in the Headers).
const protect = asyncHandler(async (req, res, next) => {
    let token
    
    // if exist authorization and exist token in Bearer key.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // extract only the token from Bearer key -> and put him in token variable.
            token = req.headers.authorization.split(' ')[1];
            
            // check with the secret token of jsonwebtoken (that we build - in .ENV file) if the token is true.
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Find by id, (ID is inside the token object) after decoded it.
            req.user = await User.findById(decoded.id).select('-password')

            // if token exist -> go to the next flow 
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


// check if user is Admin.
const isReqAdmin = asyncHandler(async (req, res, next) => {
    let token
    
    
    // if exist authorization and exist token in Bearer key.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // extract only the token from Bearer key -> and put him in token variable.
            token = req.headers.authorization.split(' ')[1];
            
            // check with the secret token of jsonwebtoken (that we build - in .ENV file) if the token is true.
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Find by id, (ID is inside the token object) after decoded it.
            req.user = await User.findById(decoded.id).select('-password')

            // extract user details
            const admin = decoded.userData.isAdmin

            // check if user isAdmin
            if( ! admin ) return res.status(403).json({ message: "Access denied, Not Admin User" })
            
            // if token exist and is admin user req ->  go to the next flow.
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


// check if user is Editor.
const isReqEditor = asyncHandler(async (req, res, next) => {
    let token
    
    
    // if exist authorization and exist token in Bearer key.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // extract only the token from Bearer key -> and put him in token variable.
            token = req.headers.authorization.split(' ')[1];
            
            // check with the secret token of jsonwebtoken (that we build - in .ENV file) if the token is true.
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Find by id, (ID is inside the token object) after decoded it.
            req.user = await User.findById(decoded.id).select('-password')

            // extract user details
            const editor = decoded.userData.isEditor 

            // / check if user isEditor
            if( ! editor ) return res.status(403).json({ message: "Access denied, Not Editor User" })
            
            // if token exist and is editor user req ->  go to the next flow.
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})




export {
     protect,
     isReqAdmin,
     isReqEditor
}