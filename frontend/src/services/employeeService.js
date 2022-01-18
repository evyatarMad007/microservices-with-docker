import axios from 'axios';
import { apiUrl, headers } from '../config/config'
import { toast } from "react-toastify";



// @desc    get all employees.
// @route   [GET] /api/employees
// @access  Private
// @payload [no payload]
export async function getAllEmployees() {

    try {
        // get all employee list - to the data variable with content-type in headers
        const { data } = await axios.get(
            `${apiUrl}/api/employees`,
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

// @desc    get a single employee.
// @route   [GET] /api/employees/:id
// @access  Private
// @payload employeeID
export async function getEmployee(empId) {

    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.get(
            `${apiUrl}/api/employees/${empId}`,
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

// @desc    create employee.
// @route   [POST] /api/employees/createEmployee
// @access  Private
// @payload employee: {firstName, lastName, phone, adress, roll}
export async function createEmployee(employee){


    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.post(
            `${apiUrl}/api/employees/createEmployee`,
            {employee},
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

// @desc    update employee.
// @route   [PUT] /api/employees/updateEmployee
// @access  Private
// @payload employee: { firstName, lastName, phone, adress, roll} & :id
export async function editEmployee(employeeId, employee){

    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.put(
            `${apiUrl}/api/employees/updateEmployee/${employeeId}`,
            employee,
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

// @desc    remove employee.
// @route   [DELETE] /api/employees/deleteEmployee
// @access  Private
// @payload employeeID
export async function deleteEmployee(empId) {

    try {
        // get a single employee byid - to the data variable with content-type in headers
        const { data } = await axios.delete(
            `${apiUrl}/api/employees/deleteEmployee/${empId}`,
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