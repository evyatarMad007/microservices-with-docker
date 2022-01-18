import React, {useState,useEffect} from 'react'
import { Consumer } from '../context'
import defaultProfile from '../images/employee-default-profile.png'
import {getCurrentUser} from '../services/userService'




const EmployeeCard = (props) => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')
    
    useEffect(() => {
        setLeng(props.lengNow)
    }, [props.lengNow])
    
    
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
                    <div className="employee-card" id={props._id} >
                        {getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                            ? <div className="card-options" onClick={ () => context.setMobileOptions( true) }>
                            <i className="fas fa-ellipsis-v"></i>
                            </div>
                            : ''
                        }

                        {getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                             ? <div className={`window-options-full-screen ${ context.mobileOptions ? 'window-options-full-screen-on' : 'window-options-full-screen-off' }`}>
                             <div className="window-options-outline" onClick={ () => context.setMobileOptions( false) }></div>
                             <div className={`window-options-inline ${ context.mobileOptions ? 'window-options-inline-on' : 'window-options-inline-off' }`}>
                                    <div className="edit">
                                        <div 
                                            className="tooltip"
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
                                        >
                                            { leng === 'en' ? 'Edit' : 'עריכה' }
                                        </div>
                                    </div>
                                    <div className="remove">
                                        <div 
                                            className="tooltip"
                                            onClick={ (e) =>
                                                {context.actions.removeEmployee(
                                                    e.target.parentElement.parentElement.parentElement.parentElement.id)
                                                    context.setMobileOptions( false)
                                                }
                                            }
                                        >
                                         { leng === 'en' ? 'Delete' : 'מחיקה' }
                                        </div>
                                    </div>
                            </div>
                        </div>
                            : ''
                        }


                        <div className="full-name">
                            <img className="employee-img" src={props.image ? props.image : defaultProfile} alt="employee-img" />
                            <span className="employee-name">{props.firstName} {props.lastName}</span>
                        </div>

                        <div className="roll">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            <div className="roll-box">
                                {props.roll}
                                <div className="start-date">{ leng === 'en' ? 'Start Date' : 'תאריך הצטרפות' } <span>{setDateFormat(props.empStartDate)}</span> </div>
                            </div>
                        </div>

                        <div className="phone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                        {setPhoneFormat(props.phone)}
                        </div>

                        <div className="adress">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                        {props.adress}
                        </div>
                        

                    </div>
                )
            }
        </Consumer>
    )
}

export default EmployeeCard
