import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js'
import { setUserPermissions, getAllUsers } from '../controllers/adminController.js'
import { protect, isReqAdmin } from '../middleWare/authMiddleware.js'


// Public.
router.route('/register').post(registerUser)
router.post('/login', authUser)

// Private.
router.route('/profile').get(protect, getUserProfile)

// Only Admin.
router.route('/get-all-users').get(isReqAdmin, getAllUsers)
router.route('/user-permissions').put(isReqAdmin, setUserPermissions)



export default router