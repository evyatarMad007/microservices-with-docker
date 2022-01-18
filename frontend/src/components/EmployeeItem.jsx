import React from 'react'
import { Consumer } from '../context'
import defaultProfile from '../images/employee-default-profile.png'
import {getCurrentUser} from '../services/userService'

const EmployeeItem = (props) => {

    const setDateFormat = (dateArg) => {
        let date = new Date()
        let year = date.getFullYear(dateArg)
        let day = date.getDay(dateArg)
        let month = date.toLocaleString('it-IT', { month: 'short' })
        let result = `${day} ${month} ${year}`;
        return result; 
    }
    const setPhoneFormat = (phoneArg) => {
        let othersNumbers = phoneArg.split('');
        let first3Numbers = othersNumbers.splice(0, 3);
        let space = [' ']
        let result = first3Numbers.concat(space, othersNumbers);
        return result;
    }


    return (
        <Consumer>
            {
                context => (
                    <div className="employee-item" id={props._id} >
                        <div className="first-name">
                            <img className="employee-img" src={props.image ? props.image : defaultProfile} alt="employee-img" />
                            <span className="employee-first-name">{props.firstName}</span>
                        </div>
                        <div className="last-name">{props.lastName}</div>
                        <div className="phone">{setPhoneFormat(props.phone)}</div>
                        <div className="adress">{props.adress}</div>
                        <div className="roll">{props.roll}</div>
                        <div className="start-date">
                        <span>{setDateFormat(props.empStartDate)}</span>
                        {getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true ?<div className="edit">
                            <i 
                                onClick={ (e) => 
                                    context.setEditEmployeeForm({ 
                                        displayed: true, 
                                        employee: {
                                            _id: props._id,
                                            firstName: props.firstName,
                                            lastName: props.lastName,
                                            phone: props.phone,
                                            adress: props.adress,
                                            roll: props.roll
                                        }
                                    }) 
                                } 
                                className="fas fa-pencil-alt edit"
                            ></i>
                            <div className="tooltip">Edit</div>
                            </div>
                            : ''
                        }
                            
                        {getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true ? <div className="remove">
                            <i onClick={ (e) => context.actions.removeEmployee(e.target.parentElement.parentElement.parentElement.id) } className="far fa-trash-alt remove"></i>
                            <div className="tooltip">Remove</div>
                            </div>
                            : ''
                            }
                            
                        
                        </div>
                    </div>
                )
            }
        </Consumer>
    )
}

export default EmployeeItem
