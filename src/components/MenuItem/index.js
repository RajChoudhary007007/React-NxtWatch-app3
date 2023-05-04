import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'

import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const MenuItem = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const mainHeading = isDarkTheme
        ? 'main-menu-heading'
        : 'main-menu-heading dark-color'
      const imageIcon = isDarkTheme ? 'icon-image' : 'icon-image dark-image'

      return (
        <div className="item-app-container">
          <Link className="links" to="/">
            <li className="menu-links">
              <AiFillHome className={imageIcon} />
              <h1 className={mainHeading}>Home</h1>
            </li>
          </Link>

          <Link className="links" to="/trending">
            <li className="menu-links">
              <AiFillFire className={imageIcon} />
              <h1 className={mainHeading}>Trending</h1>
            </li>
          </Link>

          <Link className="links" to="/gaming">
            <li className="menu-links">
              <AiFillFire className={imageIcon} />
              <h1 className={mainHeading}>Gaming</h1>
            </li>
          </Link>

          <Link className="links" to="/save-video">
            <li className="menu-links">
              <AiFillFire className={imageIcon} />
              <h1 className={mainHeading}>Save Videos</h1>
            </li>
          </Link>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default MenuItem
