import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import LanguageButton from '../components/LanguageButton'
import personImg from '../images/sign-in-img.png'
import {formValidationHandler} from '../utils/validate'
import {getCurrentUser} from '../services/userService'
import {sendResetPassToEmail} from '../services/userHelperService'
import {toast} from 'react-toastify'
import UserInquiry from '../components/UserInquiry'
import MoonLoader from "react-spinners/MoonLoader";

const ForgotPassword = () => {

    const [loader, setLoader] = useState(false)

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }

    // form value & valid stats
    const [email, setEmail] = useState({})

     // general settings stats
    const [emailLabel, setEmailLabel] = useState(true)

    const inputBlurHandler = (inp,value) => {
        if( value.length === 0 || value === 'DEFAULT') {
            if(inp === 'email') {
                setEmailLabel(true)
                // if(email.error) setEmail(email.error = '')
            }
        }
    }

    const validateHandler = (inp, value) => {
        let setTheState;
        const errorValidate = formValidationHandler(inp, value);

        // email: 
        if( inp === 'email' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
            } else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate}
            }
            setEmail(setTheState)
        }
    }


    if( getCurrentUser() ) return <Redirect to="/"/>   

    return (
        <div className={`forgot-password  forgot-password-${leng}`}>
                        <PageHeader>{ leng === 'en' ? 'enter your email address' : 'נא הזן את כתובת האימייל שלך' }</PageHeader>

                        <LanguageButton checkLanguage={checkLanguage} />

                        {loader && <div className="full-screen-loader">
                            <MoonLoader size={70} color='#ffffff'/>
                            {localStorage.getItem('Language') === 'en' 
                                    ? <p style={{ color: 'white' }}>Please Wait...</p>
                                    : <p style={{ color: 'white' }}>אנא המתן...</p>
                            }
                            
                            
                        </div>}

                        <form 
                            className="forgot-password__form" 
                            onSubmit={ (e) =>  {
                                e.preventDefault()
                                    setLoader(true)
                                    sendResetPassToEmail(email.value)
                                    .then( res => {
                                        setLoader(false)
                                        if( res === 'OK') {
                                            // success 
                                            if( localStorage.getItem('Language') === 'en' )  toast.info(`We will email you a password reset link`)
                                            if( localStorage.getItem('Language') === 'he' )  toast.info(`נשלח אליך למייל קישור לאיפוס סיסמה`)
                                        }
                                        if( res === 'Sending Failed') {
                                            // faild - Sending Failed 
                                            if( localStorage.getItem('Language') === 'en' )  toast.error(`Sending Failed`)
                                            if( localStorage.getItem('Language') === 'he' )  toast.error(`השליחה נכשלה`)
                                        }
                                        if( res === 'Email Not exist') {
                                            // faild - Email Not exist
                                            if( localStorage.getItem('Language') === 'en' )  toast.error(res)
                                            if( localStorage.getItem('Language') === 'he' )  toast.error('כתובת אימייל לא קיימת במאגר')
                                        } 
                                        
                                    })
                                
                            }}
                            autoComplete="off" noValidate
                        >
                            <div className="person-img-box">
                                <img className="person-img" src={personImg} alt="person-img" />
                            </div>
                            
                            <div className="input-wrapper">
                                <label className={emailLabel ? 'label-focus' : ''} 
                                    htmlFor="email"
                                >{ leng === 'en' ? 'Email' : 'אימייל' }
                                </label>
                                <input 
                                    onBlur={ (e) => inputBlurHandler('email',e.target.value)} 
                                    onFocus={ () => setEmailLabel(false)} 
                                    type="email" name="email" 
                                    onChange={ e => validateHandler("email", e.target.value)} 
                                />
                                {email.error 
                                    && 
                                    <span 
                                        className="error-valid"
                                    >{ leng === 'en' ? `${email.error}` : `האימייל אינו חוקי: חייב להכיל פורמט דוא"ל.` }
                                    </span>}
                            </div>

                            <div className="form-bottom">
                                <div className="button-wrapper">
                                    <button 
                                        className="submit" 
                                        type="submit" 
                                        disabled={email.isValid ? false : true }
                                        >{ leng === 'en' ? 'Send me a reset password link' : 'שלח לי לינק לאיפוס סיסמה' }
                                    </button>
                                </div>
                            </div>
                        </form>
                        <UserInquiry 
                            question={ leng === 'en' ? `Back To` : 'חזור לעמוד' } 
                            path="sign-in" 
                            linkText={ leng === 'en' ? 'Sign in' : 'התחברות' } 
                        />
                    </div>
    )
}

export default ForgotPassword
