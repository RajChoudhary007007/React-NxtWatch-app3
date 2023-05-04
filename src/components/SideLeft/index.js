import MenuItem from '../MenuItem'

import './index.css'

import ThemeContext from '../../Context/ThemeContext'

const SideLeft = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const sideLeftContainer = isDarkTheme
        ? 'side-app-container '
        : 'side-app-container light'
      const contactHeading = isDarkTheme
        ? 'con-heading'
        : 'con-heading lightHeading'
      const iconDescription = isDarkTheme
        ? 'sub-desc'
        : 'sub-desc dark-description'

      return (
        <div className={sideLeftContainer}>
          <div className="side-left-home-container">
            <MenuItem />
            <div className="contact-us-container">
              <h1 className={contactHeading}>CONTACT US</h1>
              <div className="icon-container-list">
                <img
                  className="icon-image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="icon-image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="icon-image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <h3 className={iconDescription}>
                Enjoy! Now to see your channels and recommendations!
              </h3>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default SideLeft
