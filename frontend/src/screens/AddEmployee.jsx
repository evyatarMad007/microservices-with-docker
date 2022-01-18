import React, {useState, useEffect} from 'react'
import { Consumer } from '../context'
import { formValidationHandler } from '../utils/validate'


const AddEmployee = (props) => {


    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    useEffect(() => {
        setLeng(props.lengNow)
    }, [props.lengNow])

    // form value & valid stats
    const [firstName, setFirstName] = useState({})
    const [lastName, setLastName] = useState({})
    const [phone, setPhone] = useState({})
    const [adress, setAdress] = useState({})
    const [roll, setRoll] = useState({})

    // general settings stats
    const [firstNameLabel, setFirstNameLabel] = useState(true)
    const [lastNameLabel, setLastNameLabel] = useState(true)
    const [phoneLabel, setPhoneLabel] = useState(true)
    const [adressLabel, setAdressLabel] = useState(true)
    const [rollLabel, setRollLabel] = useState(true)

    // addEmployeeUnmount
    const inputBlurHandler = (inp,value) => {
        if( value.length === 0 || value === 'DEFAULT') {

            if(inp === 'firstName') {
                setFirstNameLabel(true)
                if(firstName.error) setFirstName(firstName.error = '')
            }
            if(inp === 'lastName') {
                setLastNameLabel(true)
                if(lastName.error) setLastName(lastName.error = '')
            }
            if(inp === 'phone') {
                setPhoneLabel(true)
                if(phone.error) setPhone(phone.error = '')
            }
            if(inp === 'adress') {
                setAdressLabel(true)
                if(adress.error) setAdress(adress.error = '')
            }
            if(inp === 'roll') {
            setRollLabel(true)
            if(roll.error) setRoll(roll.error = '')
            }
        }
        
        
    }

    const validateHandler = (inp, value) => {
        let setTheState;
        const errorValidate = formValidationHandler(inp, value);
        // first Name: 
        if( inp === 'firstName' ) {
            if(!errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: ''}
            } else {
                setTheState = { type: inp, isValid: false, value, error: 'First name must contain only letters, min 2 max 20 characters' }
            }
            setFirstName(setTheState)
        }
        // last Name: 
        if( inp === 'lastName' ) {
            if(!errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setLastName(setTheState)
        }
        // phone: 
        if( inp === 'phone' ) {
            if(!errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setPhone(setTheState)
        }
        // adress: 
        if( inp === 'adress' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setAdress(setTheState)
        }
        // roll
        if( inp === 'roll' ) {
            if(! errorValidate ) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setRoll(setTheState)
        }

    }

    
    return (
        <Consumer>
            {
                    

                context => 

                    (
                        
                    <div className={`add-employee ${context.addEmployeeForm.displayed  ? 'add-employee-on' : 'add-employee-off'} add-employee-${leng}`}>
                        <div className="add-employee__outline" 
                             onClick={ () => {
                                 context.setAddEmployeeForm({ displayed: false})

                             }}
                        >
                        </div>
                        
                        <div className={`add-employee__inline ${context.addEmployeeForm.displayed ? 'add-employee__inline-on' : 'add-employee__inline-off'}`}>
                                
                        <div className="exit-btn" onClick={ () => context.setAddEmployeeForm({ displayed: false})}>
                            <i className="exit-icon fas fa-times"></i>
                            <i className="arrow-icon fas fa-chevron-left"></i>
                            </div>
                            <form className="form"
                                onSubmit={ (e) =>  {
                                    e.preventDefault()
                                    if(context.actions) {
                                        context.actions.addEmployee(
                                            {
                                                firstName: firstName.value,
                                                lastName: lastName.value,
                                                phone: phone.value,
                                                adress: adress.value,
                                                roll: roll.value,
                                            }
                                        )
                                    }
                                    
                                }} 
                                autoComplete="off" noValidate
                            >
                                <span className="form-title">{ leng === 'en' ? 'Add Employee' : 'הוסף עובד' }</span>

                                    <div className="input-wrapper">
                                    <label className={firstNameLabel ? 'label-focus' : ''} htmlFor="firstName">{ leng === 'en' ? 'First Name' : 'שם פרטי' }</label>
                                    <input 
                                        onBlur={ (e) => inputBlurHandler('firstName',e.target.value)}  
                                        onFocus={ () => setFirstNameLabel(false)} type="firstName" name="firstName" 
                                        className="add-employee-firstName"
                                        onChange={ e => validateHandler("firstName", e.target.value)} 
                                    />
                                    {firstName.error && <span className="error-valid">{firstName.error}</span>}
                                </div>
                        
                                <div className="input-wrapper">
                                    <label className={lastNameLabel ? 'label-focus' : ''} htmlFor="lastName">{ leng === 'en' ? 'Last Name' : 'שם משפחה' }</label>
                                    <input 
                                        onBlur={ (e) => inputBlurHandler('lastName',e.target.value)} 
                                        onFocus={ () => setLastNameLabel(false)} 
                                        type="text" name="lastName" 
                                        className="add-employee-lastName"
                                        onChange={ e => validateHandler("lastName", e.target.value)} 
                                    />
                                    {lastName.error && <span className="error-valid">{lastName.error}</span>}
                                </div>

                                <div className="input-wrapper">
                                    <label className={phoneLabel ? 'label-focus' : ''} htmlFor="phone">{ leng === 'en' ? 'Phone' : 'טלפון' }</label>
                                    <input 
                                        onBlur={ (e) => inputBlurHandler('phone',e.target.value)} 
                                        onFocus={ () => setPhoneLabel(false)} 
                                        type="tel" name="phone" 
                                        className="add-employee-phone"
                                        onChange={ e => validateHandler("phone", e.target.value)} 
                                    />
                                    {phone.error && <span className="error-valid">{phone.error}</span>}
                                </div>

                                <div className="input-wrapper">
                                    <label className={adressLabel ? 'label-focus' : ''} htmlFor="adress">{ leng === 'en' ? 'Adress' : 'כתובת' }</label>
                                    <input 
                                        onBlur={ (e) => inputBlurHandler('adress',e.target.value)} 
                                        onFocus={ () => setAdressLabel(false)} 
                                        type="text" name="adress"
                                        className="add-employee-adress"
                                        onChange={ e => validateHandler("adress", e.target.value)} 
                                    />
                                    {adress.error && <span className="error-valid">{adress.error}</span>}
                                </div>

                                <div className="input-wrapper">
                                    <label className={rollLabel ? 'label-focus' : ''} htmlFor="roll">{ leng === 'en' ? 'Roll' : 'תפקיד' }</label>
                                    <select 
                                        className="roll-select add-employee-roll" name="roll"
                                        onBlur={ (e) => inputBlurHandler('roll',e.target.value)}
                                        onFocus={ () => setRollLabel(false)} 
                                        onChange={ e => validateHandler("roll", e.target.value)}
                                        defaultValue={'DEFAULT'}
                                        >

                                            <option className="option"  value="DEFAULT" disabled></option>
                                            <option className="option"  value="HR">HR</option>
                                            <option className="option"  value="Developer">Developer</option>
                                            <option className="option"  value="Team Leader">Team Leader</option>
                                            <option className="option"  value="Operation">Operation</option>
                                            <option className="option"  value="Devops">Devops</option>
                                    </select>
                                    {roll.error && <span className="error-valid">{roll.error}</span>}
                                </div>

                            
                                <div className="button-wrapper">
                                    <button 
                                        className="submit" 
                                        type="submit" 
                                        disabled={ firstName.isValid && lastName.isValid  && phone.isValid && adress.isValid && roll.isValid 
                                            ? false 
                                            : true
                                        }
                                        >{ leng === 'en' ? 'Add' : 'הוסף' }
                                    </button> 
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    )
                
            
            }
        </Consumer>
    )
}

export default AddEmployee
