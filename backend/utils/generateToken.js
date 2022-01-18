import jwt from 'jsonwebtoken'

const generateToken = (id, userData, time = '30d') => {
    
    // generate the token with the secret key in ENV file 
    return jwt.sign({ id, userData }, process.env.JWT_SECRET, {
        
        // 30d for reset token 
        expiresIn: time
    })
}

export default generateToken;