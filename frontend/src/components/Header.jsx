import React from 'react'
import logoCompany from '../images/ls-logo.jpg'
import { Link } from 'react-router-dom'
import { Consumer } from '../context'
import { getCurrentUser, userData, logout } from '../services/userService'

const Header = () => {


  const fname = userData() && userData().firstName.split('')[0].toUpperCase();
  const lName = userData() && userData().lastName.split('')[0].toUpperCase();


  const userLogout = () => {

    // remove the token from localStorage
    logout()
    // render the website for all components: (conditional rendering view)
    window.location = '/'
  }          

    return (
      <Consumer>
        {
          context => (
            <header className="header">
              <div className="header__logo-cnt">
                  <Link className="link" to="/">
                    <img className="logo-img" src={logoCompany} alt="logo-company" />
                    <i className="arrow-icon fas fa-chevron-left"></i>
                  </Link>
              </div>

              {getCurrentUser() 
                  ?
                    <div className="header__profile-cnt">
                      
                      {getCurrentUser()
                        ? getCurrentUser().userData.isAdmin  
                            ? <div className="header__profile-btn admin-panel-link">
                                  <Link className="link" to="/admin-panel">
                                    <i className="fas fa-user-cog"></i>
                                  </Link>
                              </div> 
                            : <div className="header__profile-btn admin-panel-link">
                                <div className="link none" to="/admin-panel">

                                </div>
                              </div> 
                        : ''
                      }
                      

                      <div className="header__profile-btn">
                          {
                            ! userData().userImage === 'empty'
                              ? <img className="header__user-img" src={userData().userImage} alt="user img profile" />
                              : <div className="header__user-default-img">{fname}{lName}</div>
                          }
                          <p className="header__user-name"><span>{userData().firstName}</span> <span>{userData().lastName}</span></p>
                      </div>
                      <div className="header__logout"><i onClick={ userLogout } className="fas fa-sign-out-alt"></i></div>
                    </div>
                  : ''
              }

            </header>
          )
        }
      </Consumer>
    )
}

export default Header
