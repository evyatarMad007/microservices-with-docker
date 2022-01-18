import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import LanguageButton from '../components/LanguageButton'
import personImg from '../images/sign-in-img.png'
import UserInquiry from '../components/UserInquiry'
import { formValidationHandler } from '../utils/validate'
import {getCurrentUser} from '../services/userService'
import { Consumer } from '../context'

const SignUpScreen = () => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }

    // form value & valid stats
    const [firstName, setFirstName] = useState({})
    const [lastName, setLastName] = useState({})
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})
    const [confirmPassword, setConfirmPassword] = useState({})
    // const [passwordChecker, setPasswordChecker] = useState({})

    // general settings stats
    const [firstNameLabel, setFirstNameLabel] = useState(true)
    const [lastNameLabel, setLastNameLabel] = useState(true)
    const [emailLabel, setEmailLabel] = useState(true)
    const [passwordLabel, setPasswordLabel] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPasswordLabel, setConfirmPasswordLabel] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
            if(inp === 'email') {
                setEmailLabel(true)
                if(email.error) setEmail(email.error = '')
            }
            if(inp === 'password'){ 
                setPasswordLabel(true)
                if(password.error) setPassword(password.error = '')
            }
            if(inp === 'confirmPassword'){ 
                setConfirmPasswordLabel(true)
                if(confirmPassword.error) setConfirmPassword(confirmPassword.error = '')
            }
        }
    }

    const validateHandler = (inp, value) => {
        let setTheState;
        const errorValidate = formValidationHandler(inp, value);
        // first Name: 
        if( inp === 'firstName' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}

            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate}

            }
            setFirstName(setTheState)
        }
        // last Name: 
        if( inp === 'lastName' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate}

            }
            setLastName(setTheState)
        }

        // email: 
        if( inp === 'email' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setEmail(setTheState)
        }

        // password: 
        if( inp === 'password' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
                
            }  else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setPassword(setTheState)
        } 
        // confirm password: 
        if( inp === 'confirmPassword' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            }  else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setConfirmPassword(setTheState)
        }
    }


    if( getCurrentUser() ) return <Redirect to="/"/>      

    return (
       <Consumer>
           {
               context => (
                <div className={`sign-up  sign-up-${leng}`}>
                    <PageHeader>{ leng === 'en' ? 'Sign Up' : 'הרשמה' }</PageHeader>
        
                    <LanguageButton checkLanguage={checkLanguage} />
                    <form 
                        className="sign-up__form" 
                        onSubmit={ (e) =>  {
                            e.preventDefault()
                            if(context.actions.userSignUp) {
                                context.actions.userSignUp(
                                    {
                                        firstName: firstName.value,
                                        lastName: lastName.value,
                                        email: email.value,
                                        userImage: "",
                                        password: password.value 
                                    }
                                )
                            }
                        }} 
                        autoComplete="off" noValidate
                        >
                        <div className="person-img-box">
                            <img className="person-img" src={personImg} alt="person-img" />
                        </div>
                        
                        <span className='group-title'>{ leng === 'en' ? 'Personal Details' : 'פרטים אישיים' }</span>
        
                        <div className="input-wrapper">
                            <label className={firstNameLabel ? 'label-focus' : ''} htmlFor="firstName">{ leng === 'en' ? 'First Name' : 'שם פרטי' }</label>
                            <input 
                                onBlur={ (e) => inputBlurHandler('firstName',e.target.value)}  
                                onFocus={ () => setFirstNameLabel(false)} 
                                type="text" name="firstName" 
                                onChange={ e => validateHandler("firstName", e.target.value)} 
                            />
                            {firstName.error && <span className="error-valid">{ leng === 'en' ? `${firstName.error}` : 'שם פרטי חייב להכיל רק אותיות ובאורך 2-20.' }</span>}
                        </div>
        
                        <div className="input-wrapper">
                            <label className={lastNameLabel ? 'label-focus' : ''} htmlFor="lastName">{ leng === 'en' ? 'Last Name' : 'שם משפחה' }</label>
                            <input 
                                onBlur={ (e) => inputBlurHandler('lastName',e.target.value)} 
                                onFocus={ () => setLastNameLabel(false)} 
                                type="text" name="lastName" 
                                onChange={ e => validateHandler("lastName", e.target.value)} 
                            />
                            {lastName.error && <span className="error-valid">{ leng === 'en' ? `${lastName.error}` : 'שם משפחה חייב להכיל רק אותיות ובאורך 2-20.' }</span>}
                        </div>
        
                        <div className="input-wrapper">
                            <label className={emailLabel ? 'label-focus' : ''} htmlFor="email">{ leng === 'en' ? 'Email' : 'אימייל' }</label>
                            <input 
                                onBlur={ (e) => inputBlurHandler('email',e.target.value)} 
                                onFocus={ () => setEmailLabel(false)} type="email" name="email" 
                                onChange={ e => validateHandler("email", e.target.value)} 
                            />
                            {email.error && <span className="error-valid">{ leng === 'en' ? `${email.error}` : 'האימייל אינו חוקי: חייב להכיל פורמט דוא"ל.' }</span>}
                        </div>
                        <br /><br /><br /><br /><br />

                        <span className='group-title'>{ leng === 'en' ? 'Password' : 'סיסמה' }</span>
    
                        <div className="input-wrapper">
                            <label className={passwordLabel ? 'label-focus' : ''} htmlFor="password">{ leng === 'en' ? 'Password' : 'סיסמה' }</label>
                            <input 
                                onBlur={ (e) => inputBlurHandler('password',e.target.value)} 
                                onFocus={ () => setPasswordLabel(false)} 
                                type={ showPassword ? 'text' : 'password'}  
                                autoComplete="on" name="password" 
                                onChange={ e => validateHandler("password", e.target.value)} 
                            />
                            {password.error && <span className="error-valid">{ leng === 'en' ? `${password.error}` : `הסיסמה חייבת להיות: 6-20 תווים, אותיות גדולות וקטנות באנגלית ומספר` }</span>}
                            <span className="show-password" onClick={ () => setShowPassword( ! showPassword )}>
                            {showPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                            </span>
                        </div>
        
                        <div className="input-wrapper">
                            <label className={confirmPasswordLabel ? 'label-focus' : ''} htmlFor="confirmPassword">{ leng === 'en' ? 'Retype Password' : 'אמת סיסמה' }</label>
                            <input 
                                onBlur={ (e) => inputBlurHandler('confirmPassword',e.target.value)} 
                                onFocus={ () => setConfirmPasswordLabel(false)} 
                                type={ showConfirmPassword ? 'text' : 'Password'}  
                                autoComplete="on" name="confirmPassword" 
                                onChange={ e => validateHandler("confirmPassword", e.target.value)} 
                            />
                            {confirmPassword.error && <span className="error-valid">{ leng === 'en' ? `${confirmPassword.error}` : `הסיסמה חייבת להיות: 6-20 תווים, אותיות גדולות וקטנות באנגלית ומספר` }</span>}
                            <span className="show-password" onClick={ () => setShowConfirmPassword( ! showConfirmPassword )}>
                            {showConfirmPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                            </span>
                        </div>
                        
                        <div className="button-wrapper">
                            <p className="password-match-error">
                                {
                                password.isValid  && confirmPassword.isValid 
                                    ? password.value === confirmPassword.value
                                        ? ''
                                        : leng === 'en' ? 'The passwords do not match' : 'הסיסמאות לא תואמות' 
                                    : ''

                            }</p>  
                            <button 
                                className="submit" 
                                type="submit" 
                                disabled={
                                    password.isValid && confirmPassword.isValid && firstName.isValid && lastName.isValid  && email.isValid 
                                     ? password.value === confirmPassword.value 
                                        ? false 
                                        : true
                                     : true
                                }
                                >{ leng === 'en' ? 'Sign Up' : 'הירשם' }
                            </button>
                        </div>
        
                    </form>
                    <UserInquiry question={ leng === 'en' ? 'Have an account?' : 'יש לך חשבון?' } path="sign-in" linkText={ leng === 'en' ? 'Sign In' : 'התחבר' } />
                    
                    
                </div>
               )
           }
       </Consumer>

    )
}

export default SignUpScreen
