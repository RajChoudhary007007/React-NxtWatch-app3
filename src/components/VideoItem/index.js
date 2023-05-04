import {Link} from 'react-router-dom'
import './index.css'

import ThemeContext from '../../Context/ThemeContext'

const VideoItem = props => {
  const {eachMovieDetails} = props
  const {
    id,
    title,
    publishedAt,
    thumbnailUrl,
    viewCount,
    channelName,
    profileImageUrl,
  } = eachMovieDetails

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const heading = isDarkTheme ? 'heading back-color' : 'heading'
        const subHeading = isDarkTheme
          ? 'sub-heading back-color'
          : 'sub-heading'
        const description = isDarkTheme
          ? 'description back-color'
          : 'description'
        const subDescription = isDarkTheme
          ? 'sub-description back-color'
          : 'sub-description'

        return (
          <Link to={`/videos/${id}`}>
            <li className="video-list-container">
              <div className="video-list-main-container">
                <img
                  className="image-url"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
                <div className="video-list-details">
                  <img
                    className="image-thumbnail"
                    alt="channel logo"
                    src={profileImageUrl}
                  />
                  <div className="video-description-details">
                    <h1 className={heading}>{title}</h1>
                    <h1 className={subHeading}>{channelName}</h1>
                    <p className={subDescription}>{viewCount}</p>
                    <p className={description}>{publishedAt}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default VideoItem
