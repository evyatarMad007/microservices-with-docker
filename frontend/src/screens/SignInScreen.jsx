import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import LanguageButton from '../components/LanguageButton'
import personImg from '../images/sign-in-img.png'
import UserInquiry from '../components/UserInquiry'
import {formValidationHandler} from '../utils/validate'
import {getCurrentUser} from '../services/userService'
import { Consumer } from '../context'


const SignInScreen = () => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }

    // form value & valid stats
    const [password, setPassword] = useState({})
    const [email, setEmail] = useState({})

     // general settings stats
    const [emailLabel, setEmailLabel] = useState(true)
    const [passwordLabel, setPasswordLabel] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const inputBlurHandler = (inp,value) => {
        if( value.length === 0 || value === 'DEFAULT') {
            if(inp === 'email') {
                setEmailLabel(true)
                // if(email.error) setEmail(email.error = '')
            }
            if(inp === 'password'){ 
                setPasswordLabel(true)
                // if(password.error) setPassword(password.error = '')
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
        
        // password: 
        if( inp === 'password' ) {
            if(! errorValidate) {
                setTheState = { type: inp, isValid: true, value, error: errorValidate}
                
            }  else {
                setTheState = { type: inp, isValid: false, value, error: errorValidate }
            }
            setPassword(setTheState)
        } 
    }



    if( getCurrentUser() ) return <Redirect to="/"/>   

    return (
        <Consumer>
            {
                context => (
                    <div className={`sign-in  sign-in-${leng}`}>
                        <PageHeader>{ leng === 'en' ? 'Sign In' : 'התחברות' }</PageHeader>

                        <LanguageButton checkLanguage={checkLanguage} />

                        <form 
                            className="sign-in__form" 
                            onSubmit={ (e) =>  {
                                e.preventDefault()
                                if(context.actions.userSignIn) {
                                    context.actions.userSignIn(
                                        {
                                            email: email.value,
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
                            
                            <div className="input-wrapper">
                                <label className={emailLabel ? 'label-focus' : ''} htmlFor="email">{ leng === 'en' ? 'Email' : 'אימייל' }</label>
                                <input 
                                    onBlur={ (e) => inputBlurHandler('email',e.target.value)} 
                                    onFocus={ () => setEmailLabel(false)} 
                                    type="email" name="email" 
                                    onChange={ e => validateHandler("email", e.target.value)} 
                                />
                                {email.error && <span className="error-valid">{ leng === 'en' ? `${email.error}` : `האימייל אינו חוקי: חייב להכיל פורמט דוא"ל.` }</span>}
                            </div>

                            <div className="input-wrapper">
                                <label className={passwordLabel ? 'label-focus' : ''} htmlFor="password">{ leng === 'en' ? 'Password' : 'סיסמה' }</label>
                                <input 
                                    onBlur={ (e) => inputBlurHandler('password',e.target.value)} 
                                    onFocus={ () => setPasswordLabel(false)} 
                                    type={ showPassword ? 'text' : 'password'}  
                                    autoComplete="on" name="password" 
                                    onChange={ e => validateHandler("password",e.target.value)} 
                                />
                                {password.error && <span className="error-valid">{ leng === 'en' ? `${password.error}` : `הסיסמה חייבת להיות: 6-20 תווים, אותיות גדולות וקטנות באנגלית ומספר` }</span>}
                                <span className="show-password" onClick={ () => setShowPassword( ! showPassword )}>
                                    {showPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                                </span>
                            </div>

                            <div className="form-bottom">
                            <div className="button-wrapper">
                            <button className="submit" type="submit" disabled={password.isValid && email.isValid ? false : true }>{ leng === 'en' ? 'Sign In' : 'התחבר' }</button>
                            </div>
                            
                            <Link 
                                className="link-forgot-pass" 
                                to="/forgot-password"
                            >{ leng === 'en' ? 'Forgot password?' : 'שכחת את הסיסמה?' }
                            </Link>
                            </div>
                        </form>
                        <UserInquiry question={ leng === 'en' ? `Don't have an account?` : 'אין לך עדיין חשבון?' } path="sign-up" linkText={ leng === 'en' ? 'Sign Up' : 'הירשם' } />
                        
                    </div>
                )
            }
        </Consumer>
    )
}

export default SignInScreen