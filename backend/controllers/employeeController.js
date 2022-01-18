import asyncHandler from 'express-async-handler'
import Employee from '../models/employeeModel.js'


// @desc    get all employees.
// @route   [GET] /api/employees/
// @access  Public
// @payload [no payload]
const getEmployees = asyncHandler(async (req, res) => {
    // find all employees 
    const employees = await Employee.find({})
        

    // if u find them, send it to client 
    if(employees) {
        // send it to client 
        res.json(employees)
    } else {
        res.status(404)
        throw new Error('The employees not found, something wrong...')
    } 
})

// @desc    get a single employee.
// @route   [GET] /api/employees/:id
// @access  Public
// @payload employeeID
const getEmployeeById = asyncHandler(async (req, res) => {
    
    // find employee byid 
    const employee = await Employee.findById(req.params.id)


    // if u find him, send it to client 
    if(employee) {
        res.json(employee)
    } else {
        res.status(404)
        throw new Error('The employee with the given ID not found')
    } 
})

// @desc    create employee.
// @route   [POST] /api/employees/createEmployee
// @access  Private
// @payload employee: {firstName, lastName, phone, adress, roll}
const createEmployee = asyncHandler(async (req, res) => {
    

    // take the data from client
    const { firstName, lastName, phone, adress, roll } = req.body.employee;

    // create a new employee.
    const employee = await Employee.create({
        firstName,
        lastName,
        phone,
        adress,
        roll
    })

    // if employee created? send the data to client.
    if( employee ) {
        res.status(201).json(employee)
    } else {
        res.status(400)
        throw new Error('Invalid employee data')
    }
})


// @desc    update employee.
// @route   [PUT] /api/employees/updateEmployee
// @access  Private
// @payload employee: { firstName, lastName, phone, adress, roll} & :id
const editEmployee = asyncHandler(async (req, res) => {
    
    // take the data from client
    const employeeData = req.body;

    // find the id of current employee, and replace the data with employee variable (from client).
    const employee = await Employee.findOneAndUpdate({_id: req.params.id} , employeeData);

    // if employee updated? send the data to client.
    if( employee ) {
        res.status(201).json(employee)
    } else {
        res.status(404)
        throw new Error('The employee with the given ID not found')
    }  
})


// @desc    remove employee.
// @route   [DELETE] /api/employees/deleteEmployee
// @access  Private
// @payload employeeId
const deleteEmployee = asyncHandler(async (req, res) => {
    

    // find the id of current employee, and remove it.
    const employee = await Employee.findByIdAndRemove({_id: req.params.id});

    // if employee removed? send the data to client.
    if( employee ) {
        res.status(201).json(employee)
    } else {
        res.status(404)
        throw new Error('The employee with the given ID not found')
    }  
})



export {
    getEmployees, 
    getEmployeeById,
    createEmployee,
    editEmployee,
    deleteEmployee
}