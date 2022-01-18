import express from 'express'
const router = express.Router()
import { getEmployees, getEmployeeById, createEmployee, editEmployee, deleteEmployee } from '../controllers/employeeController.js'
import { protect } from '../middleWare/authMiddleware.js'


// Public.
router.route('/').get(getEmployees)
router.route('/:id').get(getEmployeeById)

// Private.
router.route('/createEmployee').post(protect, createEmployee)
router.route('/updateEmployee/:id').put(protect, editEmployee)
router.route('/deleteEmployee/:id').delete(protect, deleteEmployee)

export default router