import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const VideoItemDetails = props => {
  const {movieDetails} = props

  const {
    thumbnailUrl,
    title,
    channelName,
    viewCount,
    publishedAt,
  } = movieDetails.videoDetails

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const detailsHeading = isDarkTheme
          ? 'details-heading details-back'
          : 'details-heading'
        const chanelHeading = isDarkTheme
          ? 'chanel-heading chanel-heading-back'
          : 'chanel-heading'

        const subDescription = isDarkTheme
          ? 'sub-description sub-description-back'
          : 'sub-description'
        const description = isDarkTheme
          ? 'description description-back'
          : 'description'

        return (
          <li className="save-video-item">
            <div className="save-video-item-details">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-image"
              />
              <div className="video-desc-details">
                <h1 className={detailsHeading}>{title}</h1>
                <h1 className={chanelHeading}>{channelName}</h1>
                <p className={subDescription}>{viewCount}</p>
                <p className={description}>{publishedAt}</p>
              </div>
            </div>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default VideoItemDetails
