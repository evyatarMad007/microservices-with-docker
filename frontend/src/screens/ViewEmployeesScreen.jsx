import React, {useState} from 'react'
import {Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import EmployeeItem from '../components/EmployeeItem'
import EmployeeCard from '../components/EmployeeCard'
import { getCurrentUser } from '../services/userService'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import { Consumer } from '../context'
import ClipLoader from "react-spinners/ClipLoader";
import LanguageButton from '../components/LanguageButton'



const ViewEmployeesScreen = () => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }

    // popup add
    const [addEmp, setAddEmp] = useState(false)
     // popup edit

    // const [propsList, setPropsList] = useState({})

    const pupupAddEmployeeHandler = e => setAddEmp(!addEmp)

    if( ! getCurrentUser() ) return <Redirect to="/sign-in"/>   

    return (
        <Consumer>
            {
                context => (
                    <div className={`employee-screen  employee-screen-${leng}`}>

                        

                        {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                                ?  <AddEmployee 
                                        pupupAddEmployeeHandler={pupupAddEmployeeHandler}
                                        addEmployeeUnmount={context.addEmployeeForm.displayed}
                                        lengNow={leng}
                                    />
                                : ''
                    }
                        {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                                ? <EditEmployee emp={context.editEmployeeForm.employee} lengNow={leng}/>
                                : ''
                        }

                        <div className="employee-screen__header-section">
                            <PageHeader position="left">{ leng === 'en' ? 'Managing Employees' : 'ניהול העובדים' }</PageHeader>
                            {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true ?
                            <div className="button-wrapper">
                                <button className="button" onClick={ () => context.setAddEmployeeForm({ displayed: true})} type="button">{ leng === 'en' ? '+ Add Employee' : 'הוסף עובד +' }</button>
                            </div>
                            : ''
                            }
                            
                        </div>
                        <LanguageButton checkLanguage={checkLanguage} />

                         {context.allEmployees && context.allEmployees.length >= 1  
                            ? <div className="employee-screen__employee-section">
                                    <div className="table-header">
                                    <div className="first-name-title">{ leng === 'en' ? 'First Name' : 'שם פרטי' }</div>
                                    <div className="last-name-title"> { leng === 'en' ? 'Last Name' : 'שם משפחה' }</div>
                                    <div className="phone-title">{ leng === 'en' ? 'Phone' : 'טלפון' }</div>
                                    <div className="adress-title">{ leng === 'en' ? 'Adress' : 'כתובת' }</div>
                                    <div className="roll-title">{ leng === 'en' ? 'Roll' : 'תפקיד' }</div>
                                    <div className="start-date-title">{ leng === 'en' ? '' : 'תאריך הצטרפות' }</div>
                                    </div>
                                    
                                   
                                    
                                    
                                    
                                    
                                    
                                    
                                    <div className="table-body">

                                    {context.allEmployees && context.allEmployees.map( emp => 
                                        <EmployeeItem
                                            key={emp._id}
                                            _id={emp._id}
                                            image={emp.image}
                                            firstName={emp.firstName}
                                            lastName={emp.lastName}
                                            phone={emp.phone}
                                            adress={emp.adress}
                                            roll={emp.roll}
                                            empStartDate={emp.createdAt}
                                        />
                                    )}

                                    {context.allEmployees && context.allEmployees.map( emp => 
                                        <EmployeeCard
                                            key={emp._id}
                                            _id={emp._id}
                                            image={emp.image}
                                            firstName={emp.firstName}
                                            lastName={emp.lastName}
                                            phone={emp.phone}
                                            adress={emp.adress}
                                            roll={emp.roll}
                                            empStartDate={emp.createdAt}
                                            lengNow={leng}
                                        />
                                    )}

                                    

                                    </div>

                                    <div className="table-footer"></div>
                            
                              </div>
                            : <p className="loader-box"><ClipLoader size={70} /></p>
                    }
                    </div>

                )
            }
        </Consumer>
    )
}

export default ViewEmployeesScreen
