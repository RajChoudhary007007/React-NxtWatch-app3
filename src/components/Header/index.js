import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

class Header extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, onChangeThemeStatus} = value
          const NavMobileContainer = isDarkTheme
            ? 'nav-mobile-container'
            : `nav-mobile-container light`
          const HeaderLogoImg = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const logoutButton = isDarkTheme
            ? 'logout-button'
            : 'logout-button color-button'

          const onClickTheme = () => {
            onChangeThemeStatus()
          }

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          return (
            <div className="app-container">
              <div className={NavMobileContainer}>
                <Link className="links" to="/">
                  <img
                    className="website-logo"
                    alt="website logo"
                    src={HeaderLogoImg}
                  />
                </Link>
                <div className="Nav-mobile-icons">
                  <button
                    type="button"
                    className="theme-button"
                    onClick={onClickTheme}
                  >
                    {isDarkTheme ? (
                      <FiSun className="themes-icon" color="white" />
                    ) : (
                      <FaMoon className="themes-icon" />
                    )}
                  </button>
                  <img
                    className="profile-image"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                  <Popup
                    modal
                    trigger={
                      <button className={logoutButton} type="button">
                        Logout
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="logout-container">
                        <p>Are you sure, you want to logout</p>
                        <div className="btn-container">
                          <button
                            className="cancel-button "
                            type="button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            className="confirm-button "
                            type="button"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Header)
