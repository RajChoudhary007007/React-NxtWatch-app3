import {FaFirefox} from 'react-icons/fa'
import Header from '../Header'
import SideLeft from '../SideLeft'
import VideoItemDetails from '../VideoItemDetails'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const VideosDetails = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value
      const homeSideRight = isDarkTheme
        ? 'home-side-right black-background'
        : 'home-side-right'
      const noSaveHeading = isDarkTheme
        ? 'no-save-heading'
        : 'no-save-heading no-background'
      const noSaveDis = isDarkTheme
        ? 'no-save-disc'
        : 'no-save-disc no-background-des '
      const saveHeading = isDarkTheme
        ? 'save-heading'
        : 'save-heading save-heading-bac'

      const renderSavedVideos = () => (
        <div className="save-video-container">
          <div className="save-detail-container">
            <FaFirefox width={100} className="header-icon" />
            <h1 className={saveHeading}>Saved Videos</h1>
          </div>
          <ul className="save-video-details">
            {savedVideosList.map(eachVideo => (
              <VideoItemDetails key={eachVideo.id} movieDetails={eachVideo} />
            ))}
          </ul>
        </div>
      )

      return (
        <>
          <Header />
          <div className="home-app-container">
            <div className="home-side-left">
              <SideLeft />
            </div>
            <div className={homeSideRight}>
              {savedVideosList.length === 0 ? (
                <div className="no-video-container">
                  <img
                    className="no-image"
                    alt="no saved videos"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  />
                  <h1 className={noSaveHeading}>No saved videos found</h1>
                  <p className={noSaveDis}>
                    Save your videos by clicking a button
                  </p>
                </div>
              ) : (
                renderSavedVideos()
              )}
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)
export default VideosDetails
