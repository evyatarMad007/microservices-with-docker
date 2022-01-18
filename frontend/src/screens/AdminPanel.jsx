import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import LanguageButton from '../components/LanguageButton'
import personImg from '../images/manager-img.png'
import { getAllUsers, userPermissions } from '../services/AdminService'
import {getCurrentUser} from '../services/userService'
import {toast} from 'react-toastify'

const AdminPanel = () => {

    // component Language 
    const [leng, setLeng] = useState(localStorage.getItem('Language') || 'en')

    const checkLanguage = (lengProps) => {
        setLeng(lengProps)
    }


    // all users list. 
    const [allUsers, setAllUsers] = useState([])

    // form value & valid stats
    const [userSelect, setUserSelect] = useState({})
    const [authSelect, setAuthSelect] = useState({})

    // const [reset, setReset] = useState(false) 

    // general settings stats
    const [userSelectLabel, setUserSelectLabel] = useState(true)
    const [authSelectLabel, setAuthSelectLabel] = useState(true)

    // [GET] get all users from server.
    useEffect(() => {
        getAllUsers()
        .then(users => setAllUsers(users))
    },[])



    const inputBlurHandler = (inp,value) => {
        if( value.length === 0 || value === 'DEFAULT') {

            if(inp === 'userSelect') {
                setUserSelectLabel(true)
                if(userSelect.error) setUserSelect(userSelect.error = '')
            }
            if(inp === 'authSelect') {
                setAuthSelectLabel(true)
                if(authSelect.error) setAuthSelect(authSelect.error = '')
            }
        }
    }

    const validateHandler = (inp, value) => {
        let setTheState;
        // const errorValidate = formValidationHandler(inp, value);
        
        if( inp === 'userSelect'  ) {
            if(  value.length <= 0 ||  value === 'DEFAULT') {
                setTheState = { type: inp, isValid: false, value, error: 'Select an Option'}
            } else {
                setTheState = { type: inp, isValid: true, value, error: ''}
            }
            setUserSelect(setTheState)
        }
        if( inp === 'authSelect'  ) {
            if( value.length <= 0 ||  value === 'DEFAULT' ) {
                setTheState = { type: inp, isValid: false, value, error: 'Select an Option'}
            } else {
                setTheState = { type: inp, isValid: true, value, error: ''}
                
            }
            setAuthSelect(setTheState)
        }
    }

    // const checkLanguage = (lengProps) => {
    //     setLeng(lengProps)
    // }



    if( ! getCurrentUser().userData.isAdmin === true ) return <Redirect to="/"/>      

    return (
        <div className={`admin-panel  admin-panel-${leng}`}>
        <PageHeader>{ leng === 'en' ? 'Admin Panel' : 'פאנל ניהול' }</PageHeader>

        <LanguageButton checkLanguage={checkLanguage} />
        <form 
            className="admin-panel__form" 
            onSubmit={ (e) =>  {
                e.preventDefault()
                    userPermissions(
                        userSelect.value,
                        authSelect.value
                    )
                    // Send an indication to the user
                    if( localStorage.getItem('Language') === 'en' )  toast.success('User permissions updated.')
                    if( localStorage.getItem('Language') === 'he' )  toast.success('הרשאות משתמש עודכנו.')
            }} 
            autoComplete="off" noValidate
            >
            <div className="person-img-box">
                <img className="person-img" src={personImg} alt="person-img" />
            </div>
            
            <span className='group-title'>{ leng === 'en' ? 'Set User Permissions' : 'הגדר הרשאות משתמש' }</span>
            <div className="input-wrapper">
                <label className={userSelectLabel ? 'label-focus' : ''} htmlFor="userSelect">{ leng === 'en' ? 'User' : 'משתמש' }</label>
                <select 
                    className="userSelect-select" name="userSelect"
                    onBlur={ (e) => inputBlurHandler('userSelect',e.target.value)}
                    onFocus={ () => setUserSelectLabel(false)} 
                    onClick={ e => validateHandler("userSelect", e.target.value)}
                >
                    <option className="option"  value="DEFAULT">{}</option>
                        { allUsers && allUsers.map( (user, inx) => <option className="option" key={inx}  value={user.email}>{user.email}</option> ) }
                    </select>
                {userSelect.error && <span className="error-valid">{ leng === 'en' ? `${userSelect.error}` : 'בחר אפשרות' }</span>}
            </div>

            <div className="input-wrapper">
                <label className={authSelectLabel ? 'label-focus' : ''} htmlFor="authSelect">{ leng === 'en' ? 'Permission' : 'הרשאות' }</label>
                <select 
                    className="authSelect-select" name="authSelect"
                    onBlur={ (e) => inputBlurHandler('authSelect',e.target.value)}
                    onFocus={ () => setAuthSelectLabel(false)} 
                    onClick={ e => validateHandler("authSelect", e.target.value)}
                >
                    <option className="option"  value="DEFAULT">{}</option>
                        <option className="option"  value="Basic">Basic</option>
                        <option className="option"  value="Editor">Editor</option>
                        <option className="option"  value="Administrator">Administrator</option>
                    </select>
                {authSelect.error && <span className="error-valid">{ leng === 'en' ? `${authSelect.error}` : 'בחר אפשרות' }</span>}
            </div>

            <div className="button-wrapper">
                <button 
                    className="submit" 
                    type="submit" 
                    disabled={
                        userSelect.isValid  && authSelect.isValid 
                            ? false
                            : true
                    }
                    >{ leng === 'en' ? 'Save' : 'שמור' }
                </button>
            </div>

        </form>
    </div>

    )
}

export default AdminPanel
