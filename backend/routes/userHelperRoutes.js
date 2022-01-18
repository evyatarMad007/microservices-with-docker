import express from 'express'
const router = express.Router()
import { sendResetPassToEmail, updateNewUserPassword } from '../controllers/userHelperController.js'



// Public.
router.post('/forgot-password', sendResetPassToEmail)
router.put('/reset-password/:token', updateNewUserPassword)


export default router