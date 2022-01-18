import React,{useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import LanguageButton from '../components/LanguageButton'
import personImg from '../images/sign-in-img.png'
import {formValidationHandler} from '../utils/validate'
import {getCurrentUser} from '../services/userService'
import {updateNewUserPassword} from '../services/userHelperService'
import {toast} from 'react-toastify'
import MoonLoader from "react-spinners/MoonLoader";


const ResetPassword = () => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }
    const [jwtStatus, setJwtStatus] = useState(false)

    const [loader, setLoader] = useState(false)

    // form value & valid stats
    const [password, setPassword] = useState({})
    const [confirmPassword, setConfirmPassword] = useState({})

     // general settings stats
     const [passwordLabel, setPasswordLabel] = useState(true)
     const [showPassword, setShowPassword] = useState(false)
     const [confirmPasswordLabel, setConfirmPasswordLabel] = useState(true)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const inputBlurHandler = (inp,value) => {
        if( value.length === 0 || value === 'DEFAULT') {
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

    useEffect(() => {
        let token = window.location.pathname.split('/')[3]
        updateNewUserPassword('', token)
        .then( res => {
            if( res === 'jwt expired' ) setJwtStatus(true)
            // if( res === 'empty value' ) console.log('password empty - please send data...');

            // console.log(res);
        })
    }, [])



    if( getCurrentUser() ) return <Redirect to="/"/>   

    
    if( jwtStatus ) return (
                        <div className={`reset-password  reset-password-${leng}`}>
                            {leng === 'en'
                                ? <span className="jwtExpired" style={{ textAlign: 'left'}}>
                                    <h3>❌ Sorry, this link has expired.</h3>
                                    <br /><br />
                                    This link is only valid for 10 minutes. ⌛
                                    <br /><br /><br />
                                    Go to the Password Reset page: 
                                     <Link 
                                        className="link-forgot-pass" 
                                        to="/forgot-password"
                                    > Click Here
                                    </Link>
                                  </span>
                                : <span className="jwtExpired" style={{ textAlign: 'right' }}>
                                    <h3>מצטערים פג תוקפו של קישור זה. ❌ </h3>
                                    <br /><br />
                                    קישור זה תקף ל-10 דקות בלבד. ⌛
                                    <br /><br /><br />
                                     למעבר לדף איפוס סיסמה
                                     <Link 
                                        className="link-forgot-pass" 
                                        to="/forgot-password"
                                    > לחץ כאן
                                    </Link>
                                  </span>
                            }
                        </div>
                    )
    return (
        
        <div className={`reset-password  reset-password-${leng}`}>

                        <PageHeader>{ leng === 'en' ? 'Enter a new password' : 'הכנס סיסמא חדשה' }</PageHeader>

                        <LanguageButton checkLanguage={checkLanguage} />
                        
                        {loader && <div className="full-screen-loader">
                            <MoonLoader size={70} color='#ffffff'/>
                            {localStorage.getItem('Language') === 'en' 
                                    ? <p style={{ color: 'white' }}>Please Wait...</p>
                                    : <p style={{ color: 'white' }}>אנא המתן...</p>
                            }
                            
                            
                        </div>}
                        
                        <form 
                            className="reset-password__form" 
                            onSubmit={ (e) =>  {
                                e.preventDefault()
                                setLoader(true)
                                let token = window.location.pathname.split('/')[3]
                                updateNewUserPassword(password.value, token)
                                .then( res => {
                                    setLoader(false)
                                    if( res.message === 'OK' ) {
                                        if( localStorage.getItem('Language') === 'en' )  toast.success('Password updated successfully!')
                                        if( localStorage.getItem('Language') === 'he' )  toast.success('!הסיסמה עודכנה בהצלחה')
                                        setTimeout(() => {
                                            window.location = '/'
                                        }, 2000);
                                    }
                                })
                                
                            }}
                            autoComplete="off" noValidate
                        >
                            <div className="person-img-box">
                                <img className="person-img" src={personImg} alt="person-img" />
                            </div>
                            
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

                            <div className="form-bottom">
                                <div className="button-wrapper">
                                    <p className="password-match-error">
                                    {
                                    password.isValid  && confirmPassword.isValid 
                                        ? password.value === confirmPassword.value
                                            ? ''
                                            : leng === 'en' ? 'Passwords do not match' : 'הסיסמאות לא תואמות' 
                                        : ''
                                    }</p> 

                                    <button 
                                        className="submit" 
                                        type="submit" 
                                        disabled={
                                            password.isValid && confirmPassword.isValid
                                             ? password.value === confirmPassword.value 
                                                ? false 
                                                : true
                                             : true
                                        }
                                        >{ leng === 'en' ? 'Save ' : 'שמור' }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
    )
}

export default ResetPassword
