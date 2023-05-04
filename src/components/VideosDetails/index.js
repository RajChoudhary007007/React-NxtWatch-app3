import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Header from '../Header'
import SideLeft from '../SideLeft'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideosDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLike: false,
    isDislike: false,
    isSaved: false,
  }

  componentDidMount() {
    this.fetchVideoData()
  }

  fetchVideoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoDetails = {
        id: data.video_details.id,
        title: data.video_details.title,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        description: data.video_details.description,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }

      this.setState({
        videoDetails: updatedVideoDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="main-spinner" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPlayer = () => {
    const {videoDetails} = this.state

    return (
      <div className="react-player-container">
        <ReactPlayer url={videoDetails.videoUrl} controls width="100%" />
      </div>
    )
  }

  renderSuccessView = () => {
    const {videoDetails, isLike, isDislike, isSaved} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, saveVideoButtonClicked} = value
          const descriptionContainer = isDarkTheme
            ? 'description-container background-color'
            : 'description-container'
          const leDaHeading = isDarkTheme
            ? 'le-da-heading background-color-des'
            : 'le-da-heading'
          const like = isLike ? 'like-class' : null
          const disLike = isDislike ? 'dis-like' : null
          const save = isSaved ? 'save' : null
          const likeButton = isLike ? 'null like-button' : 'null'
          const disLikeButton = isDislike
            ? 'dis-null dislike-button'
            : 'dis-null'
          const saveButton = isSaved ? 'save-null save-button' : 'save-null'

          const onLikeButtonClicked = () => {
            this.setState({isLike: true, isDislike: false})
          }

          const onDislikeButtonClicked = () => {
            this.setState({isDislike: true, isLike: false})
          }

          const onSaveButtonClicked = () => {
            this.setState(prevState => ({isSaved: !prevState.isSaved}))
            saveVideoButtonClicked({
              videoDetails,
            })
          }

          return (
            <div className="play-and-video-details">
              {this.renderPlayer()}
              <h2 className={descriptionContainer}>
                {videoDetails.description}
              </h2>
              <div className="dynamic-container">
                <div className="left-dynamic-container">
                  <h3 className={leDaHeading}>{videoDetails.viewCount} - </h3>
                  <h3 className={leDaHeading}> {videoDetails.publishedAt}</h3>
                </div>
                <div className="right-dynamic-container">
                  <AiOutlineLike className={like} />
                  <button
                    type="button"
                    className={likeButton}
                    onClick={onLikeButtonClicked}
                  >
                    Like
                  </button>
                  <AiOutlineDislike className={disLike} />
                  <button
                    type="button"
                    className={disLikeButton}
                    onClick={onDislikeButtonClicked}
                  >
                    Dislike
                  </button>
                  <BiListPlus className={save} />
                  <button
                    type="button"
                    className={saveButton}
                    onClick={onSaveButtonClicked}
                  >
                    Save
                  </button>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="bottom-container">
                <img
                  className="bottom-image"
                  src={videoDetails.profileImageUrl}
                  alt="channel logo"
                />
                <div className="bottom-left-description">
                  <h2 className="small-heading">{videoDetails.channelName}</h2>
                  <h2 className="small-heading">
                    {videoDetails.subscriberCount}
                  </h2>
                  <p className="small-heading">{videoDetails.title}</p>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderFailureView = () => {}

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeSideRight = isDarkTheme
            ? 'home-side-right black-background'
            : 'home-side-right'

          return (
            <>
              <Header />
              <div className="home-app-container">
                <div className="home-side-left">
                  <SideLeft />
                </div>
                <div className={homeSideRight}>
                  {this.renderBasedOnApiStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default VideosDetails
