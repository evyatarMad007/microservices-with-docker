import mongoose from 'mongoose'

// create a employee schema 
const employeeSchema = mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   },
   phone: {
       type: String,
       required: true
    },
    adress: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
      },
},{ timestamps: true })

// pack the employee Schema to the Employee class.
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee